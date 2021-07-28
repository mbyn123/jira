
export const Mark = ({ name, keyword }: { name: string, keyword: string }) => {
    if (!keyword) {
        return <span>{name}</span>
    }
    const arr = name.split(keyword)
    return (
        <>
            {
                arr.map((str, index) => <span key={index}>
                    {str}
                    {index === arr.length - 1 ? null : <span style={{ color: '#0aa679' }}>{keyword}</span>}
                </span>)
            }
        </>
    )
}