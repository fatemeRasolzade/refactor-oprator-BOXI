import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import Autocomplete from "react-autocomplete";
import React from "react";
import {FiSearch} from "react-icons/fi";


interface PropsData {
    items: object[],
    value?: string | null,
    onSelect: any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label: string
}

const AutocompleteInput = ({items, value, onSelect, onChange, label}: PropsData) => {
    return (
        <div className='autocompleteWrapper '>
            <div className='autocompleteLabel'>
                {label}
            </div>
            <Autocomplete
                getItemValue={(item) => item.label}
                items={items}
                renderItem={(item, isHighlighted, index) =>
                    <div style={{padding: ".5rem", background: isHighlighted ? 'lightgray' : 'white'}}>
                        {item?.label}
                    </div>
                }
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                menuStyle={{
                    borderRadius: '3px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    // padding: '10px',
                    zIndex:"99",
                    boxSizing: "border-box",
                    fontSize: '90%',
                    position: 'fixed',
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                    overflow: 'auto',
                    cursor: 'pointer',
                    // maxHeight: '100%', // TODO: don't cheat, let it flow to the bottom
                }}
                wrapperStyle={{width: '100%'}}
                inputProps={{className: "autocompleteInput"}}
            />
            <FiSearch/>
            <style>{`
                .autocompleteWrapper{
                    border: 1px solid #dfe1e5;
                    border-radius: 12px;
                }
            `}</style>
        </div>


    )
}

export default AutocompleteInput