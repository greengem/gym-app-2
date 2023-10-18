type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
