import { mainApiUri } from "../../config";
import useFetch from "../../hooks/useFetch";
import Block from "../block/block";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";

interface IBlock {
  data: any;
  hash: string;
  lastHash: string;
  timestamp: string;
  difficulty: number;
  nonce: number;
}

const Blocks = () => {
  const {
    data: blocks,
    loading,
    error,
  } = useFetch<IBlock[]>(`${mainApiUri}/api/blocks`);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !blocks?.length) {
    return <Loader />;
  }

  return (
    <div className="blocks">
      <h2>Blocks ({blocks.length})</h2>
      {blocks.map((block, index) => (
        <div key={block.timestamp}>
          <Block block={block} index={index} />
          {index !== blocks.length - 1 ? <div className="line"></div> : ""}
        </div>
      ))}
    </div>
  );
};

export default Blocks;
