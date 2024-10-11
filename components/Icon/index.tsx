export const Icon = ({name} : {name: string}) => {
    if (!name) return (<div></div>)
    const originalName = name.toLowerCase();

    return (
        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${originalName}/${originalName}-original.svg`} alt='icon' width={20} height={20}/>
    )
}