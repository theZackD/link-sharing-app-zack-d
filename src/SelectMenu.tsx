import MenuStyle from './SelectMenu.module.css'
import { useState } from 'react'
import Caret from './assets/images/icon-chevron-down.svg'

interface SelectOption {
    label : string;
    icon : string;
    value : any;
    placeholder : string
}

interface SelectProps {
    options : SelectOption[];
    value? : SelectOption;
    onChange : (value : SelectOption | undefined) => void;
}

export default function SelectMenu({ value, onChange, options} : SelectProps) {

    const [isOpen, setIsOpen] = useState<Boolean>(false)

    function selectOption(option : SelectOption){
        onChange(option)
    }

    return (
    <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} tabIndex={0} className={MenuStyle.container}>
        <span className={MenuStyle.value}>
        <img src={value?.icon} alt="" />
        {value?.label}

        </span>
        <div tabIndex={0} className={MenuStyle.caret}><img src={Caret} alt="" /></div>
        <ul className={`${isOpen ? MenuStyle.options : MenuStyle.noshow}`}>
        {options.map(option => (
            <li onClick={e => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
            }} 
            key={option.label}
                >
                <div className={MenuStyle.option}>
                    <img className={MenuStyle.icon} src={option.icon} alt=''/>
                    {option.label}
                </div>
                <hr className={MenuStyle.hr}/>
            </li>
            
        ))}
        </ul>
    </div>
    )
}
