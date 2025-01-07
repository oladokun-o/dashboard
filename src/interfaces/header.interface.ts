export interface DropdownItem {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
}

export interface MessageDropdownItem {
    user_abbreviation: string;
    user_abbreviation_color: {
        primary: string;
        accent: string;
    }
    user_name: string;
    message: string;
    time: string;
    number_of_messages?: number;
    online: boolean;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    icon?: string;
}

export interface NotificationDropdownItem {
    title: string;
    message: string;
    time: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    icon?: string;
}

export interface ProfileDropdownItem {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    icon?: string;
}