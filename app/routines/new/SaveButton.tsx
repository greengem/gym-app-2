type SaveButtonProps = {
    handleSave: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave }) => {
    return (
        <button onClick={handleSave} className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
            Save Routine
        </button>
    );
}
