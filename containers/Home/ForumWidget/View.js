import React from 'react';
import Link from 'next/link';
import useQuestion from 'hooks/useQuestion';
import ForumCard from 'components/ForumCard';
import Router from 'next/router';
import questionMap from '../../../map/questionMap';

const ForumContainer = () => {
  const { data, error } = useQuestion({
    url: `/questions`,
  });
  const result = data?.result || null;
  const isLoading = !data && !error;

  const questions = result ? result.map(questionMap) : [];

  return (
    <div className="inner-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Froum</h3>
        <p className="mb-0">3 Pertanyaan Terakhir</p>
      </div>
      {!isLoading &&
        questions &&
        questions.map((q) => (
          <div key={q.id} className="mb-3">
            <ForumCard
              userId={q.userId}
              imageUrl={q.imageUrl}
              comment={q.comment}
              name={q.name}
              time={q.time}
              commentCount={q.commentCount}
              likeCount={q.likeCount}
              link={`/question/${q.channelSlug}/${q.id}`}
              onLike={() => {
                Router.push(`/question/${q.channelSlug}/${q.id}`);
              }}
            />
          </div>
        ))}

      {questions.length > 2 && (
        <div className="mb-3 text-center">
          <Link href="/question">
            <a href="/question" className="btn btn-outline-secondary">
              Lihat Semua
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForumContainer;
