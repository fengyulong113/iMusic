import React, { useState } from "react";
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers(props) {
    const [category, setCategory] = useState('');
    const [alpha, setAlpha] = useState('');

    let handleUpdataAlpha = (val) => {
        setAlpha(val)
    };

    let handleUpdataCategory = (val) => {
        setCategory(val)
    };

    return (
        <NavContainer>
            <Horizen
                list={categoryTypes}
                title={"分类 (默认热门):"}
                handleClick={handleUpdataCategory}
                oldVal={category}
            ></Horizen>
            <Horizen
                list={alphaTypes}
                title={"首字母:"}
                handleClick={handleUpdataAlpha}
                oldVal={alpha}
            ></Horizen>
        </NavContainer>
    )
}

export default React.memo(Singers)