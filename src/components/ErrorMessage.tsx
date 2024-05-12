export const ErrorMessage = (props: { message: string }) => {
    return (
        <p className="font-light text-red-500 pb-4">{props.message}</p>
    )
}