interface Props {
  scene: string;
  setScene: (value: Scene) => void;
}

export type Scene = "combini" | "street" | "temple";

export default function SceneToggle({ scene, setScene }: Props) {
  return (
    <div
      style={{ position: "absolute", top: 20, left: 0, right: 20 }}
      className="flex flex-col w-22 ms-auto space-y-2 border border-teal-600 p-2"
    >
      <h2 className="text-center text-xs text-gray-800">Move To</h2>
      <button
        onClick={() => setScene("combini")}
        className={`${scene} bg-teal-500 hover:bg-teal-400 text-white text-xs font-medium p-2 rounded-sm cursor-pointer`}
      >
        Combini
      </button>
      <button
        onClick={() => setScene("street")}
        className={`${scene} bg-teal-500 hover:bg-teal-400 text-white text-xs font-medium p-2 rounded-sm cursor-pointer`}
      >
        Street
      </button>
      <button
        onClick={() => setScene("temple")}
        className={`${scene} bg-teal-500 hover:bg-teal-400 text-white text-xs font-medium p-2 rounded-sm cursor-pointer`}
      >
        Temple
      </button>
    </div>
  );
}
