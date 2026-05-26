interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function EmployeeModal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button onClick={onClose}>
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}