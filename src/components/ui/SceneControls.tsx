interface Props {
  scene: string;
  onOpen: () => void;
  onReset: () => void;
}

export default function SceneControls({ scene, onOpen, onReset }: Props) {
  return (
    <div
      style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
      className="flex justify-center space-x-4"
    >
      {scene === "combini" && (
        <button
          onClick={onOpen}
          className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium py-2 px-4 rounded-full cursor-pointer"
        >
          Open Gacha
        </button>
      )}
      {scene === "combini" && (
        <button
          onClick={onReset}
          className="bg-transparent hover:bg-teal-500 text-teal-400 text-sm font-medium hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}
