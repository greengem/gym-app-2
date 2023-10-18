import Button from '@/components/Button';

type SaveButtonProps = {
    handleSave: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave }) => {
    return (
        <Button onClick={handleSave}>
            Save Routine
        </Button>
    );
}
