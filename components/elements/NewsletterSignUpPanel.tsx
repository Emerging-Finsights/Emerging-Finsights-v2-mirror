import { NextPage } from "next"
import { Ref, useRef, useState } from "react"
import validator from "validator"
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { MAILCHIMP_ENDPOINT } from "@constants/Mailchimp"
import jsonp from "jsonp"

interface MailchimpResponse {
  result: string
  msg: string
}

const InfoMessage = (props: { text: string }) => {
  return (
    <div className="alert animate-fade-in mt-4 max-w-xs mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span className="flex-grow">{props.text}</span>
    </div>)
}

const AlertMessage = (props: { text: string }) => {
  return (
    <div className="alert alert-warning animate-fade-in mt-4 max-w-xs mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span className="flex-grow">{props.text}</span>
    </div>)
}

const ErrorMessage = (props: { text: string }) => {
  return (
    <div className="alert alert-error animate-fade-in mt-4 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span className="flex-grow">{props.text}</span>
    </div>)
}

type Status = "none" | "empty-email" | "invalid-email" | "success" | "network-error" | "mailchimp-error" | "sending"

const SignupForm = (props: {
  submitFormCallback: () => void,
  emailFieldRef: Ref<HTMLInputElement>
  status: Status
  statusMessage: string
}) => {
  return (
    <>
      <form className="form-control w-full max-w-xs mx-auto" onSubmit={
        (e) => {
          e.preventDefault()
          props.submitFormCallback()
        }}>

        <label className="label text-xl"> Email </label>
        <input ref={props.emailFieldRef} type="text" placeholder="email address" className="input input-bordered w-full" />
        <button className="mt-4 btn" onClick={props.submitFormCallback}> Subscribe </button>
        <label htmlFor="newsletter-modal" className="mt-4 btn btn-ghost underline" onClick={() => enablePageScroll()}>
          No thanks
        </label>
      </form>

      {/* Status displays */}
      {props.status == "empty-email" ? <AlertMessage text="Please enter your email address" /> : null}
      {props.status == "invalid-email" ? <AlertMessage text="Please enter a valid email address" /> : null}
      {props.status == "sending" ? <InfoMessage text="Sending..." /> : null}
      {props.status == "network-error" ? <ErrorMessage text="Network error, check your connection" /> : null}
      {props.status == "mailchimp-error" ? <ErrorMessage text={props.statusMessage} /> : null}
    </>)
}

export const NewsletterSignUpPanel: NextPage = () => {
  const emailField = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<Status>("none")
  const [statusMessage, setStatusMessage] = useState<string>("")

  const submitForm = () => {
    if (!emailField.current) {
      return
    }

    if (emailField.current.value.trim() == "") {
      setStatus("empty-email")
      return
    }

    if (!validator.isEmail(emailField.current.value)) {
      setStatus("invalid-email")
      return
    }

    const emailAddress = emailField.current.value

    // create submission url

    const submitURL = new URL(MAILCHIMP_ENDPOINT)
    submitURL.searchParams.set("EMAIL", emailAddress)

    setStatus("sending")

    // send submision request
    jsonp(submitURL.toString(), { param: 'c', timeout: 3000 },
      (error, data: MailchimpResponse) => {
        if (error) {
          // jsonp error
          setStatus("network-error")
        } else {
          // mailchimp response
          if (data.result != "success")
            setStatus("mailchimp-error")
          else
            setStatus("success")

          setStatusMessage(data.msg)
        }
      }
    )
  }

  return (
    <>
      {/* Subscribe button */}
      <label htmlFor="newsletter-modal" className="btn modal-button" onClick={() => {
        disablePageScroll()
        setStatus("none")
      }}>
        Subscribe
      </label>

      {/* Modal */}
      <input type="checkbox" id="newsletter-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box rounded-md bg-efs-new-white-100 max-w-xl">
          {/* Header */}
          <h3 className="text-3xl font-bold uppercase text-center">Join our newsletter</h3>
          {status != "success" ? <p className="py-4 text-xl text-center">Subscribe to our newsletter to get all the latest updates</p> : null}

          {status != "success" ?
            // Form
            <SignupForm emailFieldRef={emailField} submitFormCallback={submitForm} status={status} statusMessage={statusMessage} />
            :
            // Completion feedback
            <>
              <div className="mt-4 text-center text-xl py-12">
                Thank you for signing up!
              </div>

              <div className="form-control">
                <label htmlFor="newsletter-modal" className="btn btn-ghost mt-4 max-w-xs mx-auto underline"
                  onClick={() => enablePageScroll()}>
                  close
                </label>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}
