import React from 'react';

import Category from './category/Category';

const Categories = ({
  models,
  openIndex,
  projectId,
  onReload,
  onOpen,
  onClose
}) => {
  return (
    <div className="categories">
      {models.map((form, index) => (
        <Category
          data={form.data}
          projectId={projectId}
          open={openIndex.includes(index)}
          onOpen={() => onOpen(index)}
          onClose={() => onClose(index)}
          onSubmit={async (...args) => form.submit(...args).then(onReload)}
          key={form.type}
          {...form}
        />
      ))}
    </div>
  );
};

export default Categories;
