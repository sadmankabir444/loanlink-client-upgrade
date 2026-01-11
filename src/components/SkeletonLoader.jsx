import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className="card bg-base-100 shadow-xl">
      <div className="skeleton h-48 w-full bg-base-200"></div>
      <div className="card-body">
        <div className="skeleton h-6 w-3/4 bg-base-200 mb-2"></div>
        <div className="skeleton h-4 w-full bg-base-200 mb-1"></div>
        <div className="skeleton h-4 w-2/3 bg-base-200 mb-4"></div>
        <div className="skeleton h-4 w-1/2 bg-base-200 mb-2"></div>
        <div className="skeleton h-4 w-1/3 bg-base-200 mb-2"></div>
        <div className="skeleton h-4 w-1/4 bg-base-200 mb-4"></div>
        <div className="skeleton btn btn-primary btn-sm w-1/2 ml-auto"></div>
      </div>
    </div>
  ));

  return (
    <div className={type === 'card' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
      {skeletons}
    </div>
  );
};

export default SkeletonLoader;