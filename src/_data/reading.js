const Status = {
  Reading: 'Reading',
  JustStarted: 'Just Started',
  Abandoned: 'Adandoned',
};

const Type = {
  Book: 'Book',
  Kindle: 'Kindle',
  Audio: 'Audio',
};

export default {
  2025: [
    {
      title: 'The Three-Body Problem',
      author: 'Liu Cixin',
      link: '',
      pageTotal: 434,
      pageCurrent: 19,
      status: 'Reading',
      duration: null,
      type: Type.Book,
    },
  ],
  2014: [
    {
      title: 'The Game',
      author: 'Neil Strauss',
      link: '',
      pageTotal: 300,
      pageCurrent: 300,
      status: 'Finished',
      duration: null,
      type: Type.Book,
    },
  ],
};
