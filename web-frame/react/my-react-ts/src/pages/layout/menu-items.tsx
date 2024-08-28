import React, {useState} from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    { label: 'Option 1', key: 'setting:1' },
                    { label: 'Option 2', key: 'setting:2' },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    { label: 'Option 3', key: 'setting:3' },
                    { label: 'Option 4', key: 'setting:4' },
                ],
            },
        ],
    },

];

const MenuItems: React.FC = () => {
    const [currentKey, setCurrentKey] = useState('home');

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
        setCurrentKey(e.key);
    }

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[currentKey]}
            items={items}
            mode="inline"
        />
    );
}

export default MenuItems;