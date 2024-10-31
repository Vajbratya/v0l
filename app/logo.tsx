import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative w-8 h-8 group">
      <Image
        src="/LOGOLAUDAI.svg"
        alt="Laudos.ai"
        width={32}
        height={32}
        priority
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}
