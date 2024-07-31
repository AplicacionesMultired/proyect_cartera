interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, disabled, ...props }: Props): JSX.Element {
  return (
    <button
      type="submit"
      className={`text-xs 2xl:text-2xl text-white rounded-md px-4 py-2 bg-gradient-to-b from-punch-700 to-punch-800 hover:bg-gradient-to-b
      hover:from-punch-500 hover:to-punch-600 transition-all ease-in-out ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
