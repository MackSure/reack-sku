import React from 'react';
import {sku, specList} from '../mockData/data';
import './sku.css';

class Sku extends React.Component {

    state = {
        specList,
        sku,
        selectedArray: []
    }

    componentDidMount () {
        this.distinguishValidSpec();
    }

    /**
     * 格式化skuValue
     */
    formatSkuValue = () => {
        return this.state.sku.map((skuList, skuIndex) => {
            return skuList.value.split('@');
        })
        
    }

    distinguishValidSpec = () => {
        const specList = [...this.state.specList];
        specList.forEach((specListItem, specListIndex) => {
            specListItem.specValues.forEach((specValues, specIndex) => {
                
                this.formatSkuValue().forEach((formatSku, formatSkuIndex) => {
                    
                    if(formatSku[specListIndex] === specValues.specValue) {
                        specValues.disabled = false;
                    } 
                })
            })
        })
        
        this.setState({specList});
    }

    specValueChecked = (currentItem, currentSpecValuesIndex, currentSpecValueIndex) => {
        const selectedArray = [...this.state.selectedArray];
        currentItem.checked = !currentItem.checked;
        
            selectedArray[currentSpecValuesIndex] = currentItem.checked ? currentItem.specValue : null;
        
        const specList = [...this.state.specList]
        specList[currentSpecValuesIndex].specValues[currentSpecValueIndex] = currentItem;
        specList[currentSpecValuesIndex].specValues.forEach((specValue, specValueIndex) => {
            if (specValueIndex !== currentSpecValueIndex) {
                specValue.checked = false;
            }
        });
        
        this.setState({specList, selectedArray});     
    }

    

    render () {

        let renderSpecItem = this.state.specList.length && this.state.specList.map((specItem, specItemIndex) => {
            return (
               <li className="specItem" key={specItemIndex}>
                <p className="specTitle">{specItem.specName}</p>
                {specItem.specValues.map((specValueItem, specValueIndex) => {
                    return (
                        <span onClick={() => this.specValueChecked(specValueItem, specItemIndex, specValueIndex)} style={specValueItem.disabled !== false ? {color: '#999'} : specValueItem.checked ? {color: 'red'} : {}} className="specValue" key={specValueIndex}>{specValueItem.specValue}</span>
                    );
                })}
               </li>
            );
        })

        return (
        <ul className="specWrapper">
            {renderSpecItem}
        </ul>
        );

        
    }
}

export default Sku;