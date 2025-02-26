import Image, { type ImageProps } from "next/image"

export const ImageComponent = ({ isSecured, alt, src, ...rest }: { isSecured?: boolean } & ImageProps) => {
    if (!isSecured) {
        return <Image src={src} alt={alt} {...rest} />
    }

    return <Image src={`/api/image/${src}`} loader={() => `/api/image/${src}`} alt={alt} {...rest} />
}