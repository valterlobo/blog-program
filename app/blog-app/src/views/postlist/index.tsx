
import { FC } from "react";
import { SignMessage } from '../../components/SignMessage';
import { PostList } from '../../components/PostList';
export const PostListView: FC = ({ }) => {
  //

  return (
    <div className="md:hero mx-auto p-1">
      <div className="md:hero-content flex flex-col" >
        {/* CONTENT GOES HERE */}
        <div className="md:hero-content flex flex-col" >
          <PostList />
        </div>
      </div>
    </div>
  );
};
