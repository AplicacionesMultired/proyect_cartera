interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input ({ ...props }: Props): JSX.Element {
  return (
    <input className='p-4 w-full rounded-lg outline-none dark:bg-dark-tremor-content-subtle dark:text-white border-gray-300 text-gray-800 font-medium text-xl'
      {...props} />
  )
}
