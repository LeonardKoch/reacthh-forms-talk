export const ErrorMessage = (props: { error?: string }) => {
    if (!props.error) return null;
    return (
        <p className="font-light text-red-500 pb-2">{props.error}</p>
    )
}