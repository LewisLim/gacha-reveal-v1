interface Props {
  scene: string;
  onOpen: () => void;
}

export default function SceneControls({ scene, onOpen }: Props) {
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
    </div>
  );
}
