import "./Button.css";

type Props = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: Props) {
  return (
    <button
      className="button"
      type="button"
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
}

export default Button;
