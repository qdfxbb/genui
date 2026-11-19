
export type TextBlockProps = {
    text: string;
    tone?: 'default' | 'muted' | 'danger';
}

export default function TextBlock({ text, tone = 'default' }: TextBlockProps) {

    let toneClass = '';

    switch (tone) {
        case 'muted': 
            toneClass = 'text-sm text-slate-500';
            break;
        case 'danger':
            toneClass = 'text-sm text-red-600';
            break;
        default:
            toneClass = 'text-[15px] text-slate-700';
            break;
    }
    
    return (
        <p className={`whitespace-pre-wrap break-words leading-relaxed ${toneClass}`}>
            {text}
        </p>
    )
}