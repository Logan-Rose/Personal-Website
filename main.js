function show(){
    console.log(window.innerHeight)
    window.scroll({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
      });
}