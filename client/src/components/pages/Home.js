const Home = () => {
  return (
    <div className="mx-auto flex h-auto w-4/5 flex-col items-center p-4 ">
      <h1 className="py-4 font-bold">Welcome!</h1>
      <p className="my-3 w-[80%]">
        This site was build with intent to help you use translated words saved
        in{' '}
        <a
          className="font-bold hover:text-emerald-500"
          href="https://translate.google.com/saved"
          target="_blank"
          rel="noreferrer"
        >
          Google Translate
        </a>{' '}
        or to create your own Flashcards to ease your learning.
      </p>
      <p>Enjoy!</p>
    </div>
  );
};

export default Home;
