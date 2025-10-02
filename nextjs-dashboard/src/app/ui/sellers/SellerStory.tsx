import React from "react";

type Story = {
  sellerId: number;
  title: string;
  content: string; 
  createdAt: string | Date;
};

interface SellerStoriesProps {
  stories: Story[];
}

const SellerStories: React.FC<SellerStoriesProps> = ({ stories }) => {
  return (
    <section className="artisan-narratives">
      <h2 className="artisan-narratives__heading">Seller Stories</h2>
      <div className="artisan-narratives__container">
        {stories && stories.length > 0 ? (
          stories.map((story, idx) => (
            <div key={idx} className="artisan-tale">
              <div className="artisan-tale__body">
                <h3 className="artisan-tale__headline">{story.title}</h3>
                {story.content
                  .split("\n")
                  .filter((p) => p.trim() !== "")
                  .map((para, i) => (
                    <p key={i} className="artisan-tale__text">
                      {para}
                    </p>
                  ))}
                <p className="artisan-tale__timestamp">
                  Shared on {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="artisan-narratives__empty">No stories shared yet.</p>
        )}
      </div>
    </section>
  );
};

export default SellerStories;