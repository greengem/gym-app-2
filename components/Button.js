export default function Button({ children, ...props }) {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded" {...props}>
            {children}
        </button>
    );
}
