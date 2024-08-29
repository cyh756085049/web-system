import React, {useState} from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { hooksRouter } from './constants';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'react hooks',
        key: 'hooks',
        icon: <MailOutlined />,
        children: hooksRouter.map(item => ({
            key: item.key,
            label: item.label,
        }))
    },
];

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