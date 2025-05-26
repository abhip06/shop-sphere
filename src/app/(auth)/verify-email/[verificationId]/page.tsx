import VerifyEmailForm from "../../_components/VerifyEmailForm"

const VerifyEmail = ({
  params,
}: {
  params: { verificationId: string }
}) => {
  return (
    <div className="h-[calc(100vh-120px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col items-center justify-center">
      <VerifyEmailForm verificationId={params.verificationId} />
    </div>
  )
}

export default VerifyEmail;