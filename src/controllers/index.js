const showHomePage = (_, res) => {
  res.render('home', {
    title: 'Home',
  });
};

export { showHomePage };
