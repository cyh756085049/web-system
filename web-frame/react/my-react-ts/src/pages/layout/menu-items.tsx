import React, {useState} from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from 'react-router-dom';
import { items } from './constants';

const MenuItems: React.FC = () => {
    const [currentKey, setCurrentKey] = useState('emitter');
    const navigate = useNavigate();

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
        setCurrentKey(e.key);
        navigate(e.key);
    }

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[currentKey]}
            items={items}
            mode="inline"
            theme={"light"}
        />
    );
}

export default MenuItems;