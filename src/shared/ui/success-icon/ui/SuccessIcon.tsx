import Image from 'next/image'
import successIcon from '../assets/success.svg'

export default function SuccessIcon() {
	return <Image src={successIcon} alt='Success Image' width={70} height={70} />
}
