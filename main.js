let audioPlayer = document.getElementById('audioPlayer')
let addMusic = document.getElementById('addMusic')
let suffleBtn = document.getElementById('suffleBtn')
let previousButton = document.getElementById('previousButton')
let playPause = document.getElementById('playButton')
let nextButton = document.getElementById('nextButton')
let repeatBtn = document.getElementById('repeatBtn')
let playImg = document.getElementById('playImg')
let coverImg = document.getElementById('cover-img')
let slider = document.getElementById('slider')
let atualValue = document.getElementById('atualValue')
let totalValue = document.getElementById('totalValue')
let progressBar = document.getElementById('slider')
let musicList = document.getElementById('musicList')
let closeMusic = document.getElementById('closeMusicBlock')
let openButton = document.getElementById('openButton')
let musicMenu = document.getElementById('musicMenu')
let addMusicBtn = document.getElementById('addMusicBtn')


//PLAYER DO YOUTUBE 
let player;
let albumDiv = document.getElementById('albumDiv')



let suffledList = []
let isSuffleActive = false



let playlist = JSON.parse(localStorage.getItem('playlist')) || [{
  index: 0,
  src: '/assets/audios/Zack And Codeine.mp3',
  title: 'Zack and Codeine',
  artist: 'Post Malone',
  img: '/assets/imgs/92 explorerImg.jpeg'
},
{
  index: 1,
  src: '/assets/audios/Mourning.mp3',
  title: 'Morning',
  artist: 'Post Malone',
  img: '/assets/imgs/Morning Img.jpeg'
}, {
  index: 2,
  src: '/assets/audios/Statement.mp3',
  title: 'Statement',
  artist: 'Neffex',
  img: '/assets/imgs/neffex img.jpeg'
}, {
  index: 3,
  src: '/assets/audios/KYLE - iSpy feat. Lil Yachty .mp3',
  title: 'iSpy feat. Lil yanchty',
  artist: 'Kyle',
  img: '/assets/imgs/ISpy Img.jpg'
}, {
  index: 4,
  src: '/assets/audios/Go Flex.mp3',
  title: 'Go Flex',
  artist: 'Post Malone',
  img: '/assets/imgs/goFlex Img.jpeg'
},
{
  index: 5,
  src: '/assets/audios/Calm Down.mp3',
  title: 'Calm Down ft. Rema',
  artist: 'Selena Gomez',
  img: '/assets/imgs/calm downImage.jpeg'
},
{
  index: 6,
  src: '/assets/audios/Psycho.mp3',
  title: 'Psycho (part. Ty Dolla $ign)',
  artist: 'Post Malone',
  img: '/assets/imgs/92 explorerImg.jpeg'
}, {
  index: 7,
  src: '/assets/audios/92 Explorer.mp3',
  title: '92 Explorer',
  artist: 'Post Malone',
  img: '/assets/imgs/92 explorerImg.jpeg'
}, {
  index: 8,
  src: '/assets/audios/Saint-Tropez.mp3',
  title: 'Saint-Tropez',
  artist: 'Post Malone',
  img: '/assets/imgs/Saint-Tropez.jpeg'
  
}]



//Transição dinâmica de página!

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active')
  })
  
  document.getElementById(pageId).classList.add('active')
  const headerPage = document.getElementById('topDiv')
  if (pageId == 'homeContents') {
    headerPage.style.display = 'flex'
    
  } else {
    headerPage.style.display = 'none'
  }
}


//Lista de músicas tocadas recentemente
let = recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || []

console.log(recentlyPlayed)

//Função de ouvidos recentemente!

async function playedRecently(music) {
  recentlyPlayed = recentlyPlayed.filter(song => song.title !== music.title)
  
  recentlyPlayed.unshift(music)
  localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed))
  
  showRecentlyPlayed(recentlyPlayed)
  
  
  const recentContainer = document.getElementById('recentPlayedConteiner')
  
  if (recentlyPlayed.length >= 1) {
    recentContainer.style.display = 'flex'
  }
}



function showRecentlyPlayed(itens) {
  const recentlyPlayedDiv = document.getElementById('recentMusic')
  
  recentlyPlayedDiv.innerHTML = ''
  
  itens.forEach(item => {
    const playedItemsDiv = document.createElement('div')
    
    playedItemsDiv.innerHTML = `
    <div class="recentPlayedItemsDiv">
          <img src="${item.img}" id="playedItemImg"/>
          <h4>${item.title}</h4>
        </div>
    `
    
    recentlyPlayedDiv.appendChild(playedItemsDiv)
  })
}


let artistName = document.getElementById('artistName')
let musicName = document.getElementById('musicName')
let backImg = document.getElementById('backCoverImg');
let main = document.getElementById('appContents')


let playlistIndex = JSON.parse(localStorage.getItem('currentIndex')) || 0

if (playlistIndex < 0) {
  playlistIndex = 0
  
  localStorage.setItem('currentIndex', JSON.stringify(playlistIndex))
  
  playlistIndex = JSON.parse(localStorage.getItem('currentIndex'))
}

let suffleOuNormal = playlist;


function LoadCurrentIndex(song) {
  
  if (isSuffleActive) {
    const suffleIndex = playlist.findIndex(index => index.title === song.title)
    
    localStorage.setItem('currentIndex', JSON.stringify(suffleIndex))
    
  } else {
    const currentIndex = suffleOuNormal.findIndex(index => index.title === song.title)
    
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex))
  }
  
}
LoadCurrentIndex(playlist)

function withNoMp3(musicTitle) {
  return musicTitle.replace(/\s*.mp3/, '')
}

audioPlayer.addEventListener('loadedmetadata', () => {
  if (!isNaN(audioPlayer.duration)) {
    formatTime(audioPlayer.duration)
    
  }
})

addMusic.addEventListener('change', (e) => {
  
  const audioFile = addMusic.files[0]
  const audio = URL.createObjectURL(audioFile)
  const defaultThumbSrc = '/assets/imgs/070f28a3-0dd3-4f3b-a9f3-4947a196a408.webp'
  const musicTitle = withNoMp3(audioFile.name)
  playlist.push({
    index: playlist.length,
    src: audio,
    title: musicTitle,
    artist: 'desconhecido',
    img: defaultThumbSrc
  })
  
  localStorage.setItem('playlist', JSON.stringify(playlist))
  
  MyPlaylist()
  loadMusicList()
})

function changeBackground(img) {
  try {
    Vibrant.from(coverImg.src).getPalette()
      .then(palette => {
        const vibrant = palette.Vibrant.hex
        const muted = palette.Muted.hex
        
        backImg.style.background = `linear-gradient( to bottom, ${vibrant}, ${muted} )`
        
      })
  } catch (e) {
    backImg.style.backgroundImage = `url(${coverImg.src})`
    
  }
  
  backImg.style.backgroundRepeat = 'no-repeat'
}

function loadMusicList() {
  
  musicList.innerHTML = ''
  if (isSuffleActive) {
    suffleOuNormal = suffledList
  } else {
    suffleOuNormal = playlist
    musicList.id = 'musicList'
    const myListDiv = document.getElementById('myPlaylist')
  }
  
  suffleOuNormal.forEach(music => {
    
    const imgsDiv = document.createElement('div')
    imgsDiv.id = 'imgsDiv'
    
    const infoListDiv = document.createElement('div')
    
    const musicDiv = document.createElement('div')
    musicDiv.id = 'musicDiv'
    
    const playingImgDiv = document.createElement('div')
    playingImgDiv.class = 'playingImgDiv'
    
    //atual playing img
    const atualPlayingImg = document.createElement('img')
    atualPlayingImg.src = '/assets/imgs/bars-svgrepo-com.svg'
    atualPlayingImg.class = 'atualPlayingImg'
    
    const atualPlayImgStyle = document.getElementById('atualPlayingImg')
    
    
    
    imgsDiv.addEventListener('click', (ev) => {
      playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
      
      if (isSuffleActive) {
        const atualIndex = suffleOuNormal.findIndex(atual => atual.title === music.title)
        
        playlistIndex = atualIndex
        loadSong(playlistIndex)
      } else {
        const atualIndex = suffleOuNormal.findIndex(atual => atual.title === music.title)
        
        playlistIndex = atualIndex
        loadSong(playlistIndex)
      }
      
      
    })
    
    const musicImg = document.createElement('img')
    musicImg.src = music.img;
    musicImg.id = 'musicImg'
    
    const musicTitle = document.createElement('h3')
    musicTitle.innerText = music.title
    const artistName = document.createElement('p')
    artistName.innerText = music.artist
    artistName.id = 'artistName'
    
    
    
    
    
    imgsDiv.appendChild(musicImg)
    imgsDiv.appendChild(infoListDiv)
    musicDiv.appendChild(imgsDiv)
    
    musicDiv.appendChild(playingImgDiv)
    
    infoListDiv.appendChild(musicTitle)
    infoListDiv.appendChild(artistName)
    
    playingImgDiv.appendChild(atualPlayingImg)
    
    musicList.appendChild(musicDiv)
  })
  
}







function MyPlaylist() {
  
  const myListDiv = document.getElementById('myPlaylist')
  
  myListDiv.innerHTML = ''
  
  let isPlaying = false
  
  playlist.forEach(music => {
    
    const coverDiv = document.createElement('div')
    coverDiv.id = 'CoverDiv'
    
    const infoListDiv = document.createElement('div')
    
    coverDiv.addEventListener('click', () => {
      playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
      playlistIndex = music.index
      openMusic()
      loadSong(playlistIndex)
      
      
      backImg.style.display = 'flex'
      appContents.style.display = 'flex'
      hiddenYtVideo()
      pauseVideo()
      
    })
    
    
    const musicImg = document.createElement('img')
    musicImg.src = music.img;
    musicImg.id = 'AlbumImg';
    const musicTitle = document.createElement('h4')
    
    musicTitle.innerText = music.title
    const artistName = document.createElement('p')
    artistName.innerText = music.artist
    artistName.id = 'artistName'
    
    coverDiv.appendChild(musicImg)
    coverDiv.appendChild(infoListDiv)
    infoListDiv.appendChild(musicTitle)
    infoListDiv.appendChild(artistName)
    
    myListDiv.appendChild(coverDiv)
  })
}

function audioPlay() {
  audioPlayer.play()
}
async function loadSong(i) {
  try {
    
    let song = suffleOuNormal[i]
    
    if (song.src) {
      audioPlayer.src = song.src;
      coverImg.src = song.img;
      artistName.innerText = song.artist;
      musicName.innerText = song.title;
      playedRecently(song)
      
    } else {
      slider.style.display = 'none'
      atualValue.style.display = 'none'
      totalValue.style.display = 'none'
    }
    
    
    
    LoadCurrentIndex(song)
    loadMusicList()
    MyPlaylist()
    changeBackground()
    audioPlay()
    
    
  } catch (e) {
    const suasMusicasText = document.getElementById('suasMusicas')
    console.log(e)
  }
}


let pauseImg = '/assets/imgs/pause_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
playPause.addEventListener('click', (ev) => {
  slider.value = audioPlayer.currentTime
  
  
  if (audioPlayer.paused) {
    
    audioPlayer.play()
    playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
    
  } else {
    
    audioPlayer.pause()
    playImg.src = '/assets/imgs/play-svgrepo-com.svg'
  }
})

previousButton.addEventListener('click', () => {
  playlistIndex -= 1
  
  if (playlistIndex < 0) {
    playlistIndex = 0
  }
  
  loadSong(playlistIndex)
  
  playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
  
  
})
nextButton.addEventListener('click', () => {
  try {
    playlistIndex++
    loadSong(playlistIndex)
    if (playlistIndex === playlist.length) {
      playlistIndex = 0
      loadSong(playlistIndex)
    }
    
    
    
    playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
    
    coverImg.classList.remove('cover-imgANM')
    audioPlayer.play()
  } catch (e) {
    console.log(e)
  }
})


function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60)
  let second = Math.floor(seconds % 60)
  
  if (second < 10) {
    return `${minutes}:0${second}`
  } else {
    return `${minutes}:${second}`
  }
}

audioPlayer.addEventListener('timeupdate', () => {
  let currentTime = audioPlayer.currentTime
  atualValue.innerText = formatTime(currentTime)
  let duration = audioPlayer.duration
  progressBar.max = duration
  if (!isNaN(audioPlayer.duration)) {
    totalValue.innerText = formatTime(duration)
  } else {
    totalValue.innerText = '0:00'
    progressBar.value = currentTime
  }
  if (currentTime > duration) {
    playlistIndex++
    loadSong(playlistIndex)
  }
  if (playlistIndex === playlist.length) {
    playlistIndex = 0
    loadSong(playlistIndex)
  }
  
})
suffleBtn.onclick = () => {
  isSuffleActive = !isSuffleActive
  
  if (isSuffleActive) {
    
    suffleBtn.classList.add('active')
    suffledList = suffleArray([...playlist])
    playlistIndex = 0
    loadMusicList()
    loadSong(playlistIndex)
    
    playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
  } else {
    suffleBtn.classList.remove('active')
    suffledList = [...playlist]
    suffleOuNormal = playlist
    
    playlistIndex = 0
    loadMusicList()
    loadSong(playlistIndex)
  }
}

function suffleArray(array) {
  const indices = array.map((_, index) => index);
  
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  
  return array
}

function updateProgress() {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  
  slider.value = currentTime
  
  if (!isNaN(duration)) {
    progressBar.value = currentTime
    atualValue.innerText = formatTime(currentTime)
    duration.innerText = formatTime(totalValue);
  } else if (currentTime === duration) {
    playlistIndex += 1
    
    loadSong(playlistIndex)
  }
  if (playlistIndex > playlist.length) {
    playlistIndex = 0
    loadSong(playlistIndex)
  }
  if (currentTime == duration) {
    playlistIndex++
    loadSong(playlistIndex)
    audioPlayer.play()
  } else if (suffleOuNormal.src) {
    
  }
}
progressBar.addEventListener('input', (e) => {
  audioPlayer.currentTime = progressBar.value
  
  
})

// Mobile
slider.addEventListener('touchstart', (e) => {
  audioPlayer.pause()
  
  playImg.src = '/assets/imgs/play-svgrepo-com.svg'
})
slider.addEventListener('touchend', (e) => {
  audioPlayer.play()
  
  playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
  
})
//PC 
slider.addEventListener('mouseup', (e) => {
  audioPlayer.pause()
  
  playImg.src = '/assets/imgs/play-svgrepo-com.svg'
})
slider.addEventListener('mousedown', (e) => {
  audioPlayer.play()
  
  playImg.src = '/assets/imgs/pause-svgrepo-com.svg'
})

audioPlayer.addEventListener('timeupdate', () => {
  updateProgress()
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 99
  
  slider.style.background = `linear-gradient(to right, #D5D5D5 ${progressPercent}%, #6A6A6A ${progressPercent}%)`
  
})



function CloseMusic() {
  //Transparência dos botões
  const buttons = document.getElementById('buttonsDiv')
  
  backImg.style.height = '8dvh'
  backImg.style.transition = ' 0.2s ease'
  backImg.style.position = 'absolute'
  backImg.style.bottom = '7%'
  backImg.style.borderRadius = '9px 9px'
  backImg.style.minHeight = '55px'
  backImg.style.maxHeight = '55px'
  
  coverImg.onclick = () => {
    openMusic()
  }
  
  addMusicBtn.style.opacity = '0%'
  
  //mexe no music photo
  coverImg.style.transition = '0.2s ease'
  coverImg.style.height = '45px'
  coverImg.style.borderRadius = '7px'
  coverImg.style.boxShadow = 'none'
  coverImg.style.width = '45px'
  coverImg.style.position = 'absolute'
  coverImg.style.bottom = '9%'
  coverImg.style.left = '15px'
  
  
  
  
  const playingNowText = document.getElementById('playingNowText')
  const suasMusicasText = document.getElementById('suasMusicasText')
  
  
  suasMusicasText.style.display = 'none'
  playingNowText.style.display = 'none'
  
  musicName.style.position = 'absolute'
  musicName.style.bottom = '45%'
  musicName.style.left = '70px'
  musicName.style.fontSize = '1rem'
  
  artistName.style.position = 'absolute'
  artistName.style.bottom = '15%'
  artistName.style.left = '70px'
  artistName.style.fontSize = '13px'
  
  slider.style.position = 'fixed'
  slider.style.bottom = '7%'
  slider.style.left = '2px'
  slider.style.width = '100vw'
  slider.style.pointerEvents = 'none'
  slider.classList.toggle('hiddenThumb')
  
  closeMusic.style.display = 'none'
  
  playPause.style.position = 'absolute'
  playPause.style.bottom = '8%'
  playPause.style.right = '5%'
  playPause.style.height = '43px'
  playPause.style.width = '43px'
  
  
  appContents.style.height = '8dvh'
  appContents.style.overflow = 'hidden'
  appContents.style.transition = '0.3s ease'
  appContents.style.borderRadius = '9px 9px'
  appContents.style.position = 'absolute'
  appContents.style.bottom = '7%'
  appContents.style.minHeight = '55px'
  appContents.style.maxHeight = '55px'
  
  
  
  musicMenu.style.display = 'flex'
}

function openMusic() {
  const buttons = document.getElementById('buttonsDiv')
  
  buttons.style.opacity = '100%'
  
  backImg.style.height = '100dvh'
  backImg.style.transition = '0.45s ease'
  backImg.style.position = 'absolute'
  backImg.style.bottom = '0%'
  backImg.style.zIndex = '1'
  backImg.style.borderRadius = '0px'
  backImg.style.maxHeight = '100%'
  closeMusic.style.display = 'flex'
  
  
  coverImg.style.transition = 'height 0.2s ease'
  coverImg.style.height = '325px'
  coverImg.style.width = '88vw'
  coverImg.style.position = 'relative'
  coverImg.style.bottom = '0%'
  coverImg.style.left = '0px'
  coverImg.style.boxShadow = '5px 7px 16px rgba(0, 0, 0, 0.5)'
  
  const playingNowText = document.getElementById('playingNowText')
  const suasMusicasText = document.getElementById('suasMusicasText')
  
  
  suasMusicasText.style.display = 'flex'
  playingNowText.style.display = 'flex'
  
  musicName.style.position = 'relative'
  musicName.style.bottom = '0%'
  musicName.style.left = '0px'
  musicName.style.fontSize = '22px'
  
  artistName.style.position = 'relative'
  artistName.style.bottom = '0%'
  artistName.style.left = '0px'
  
  
  slider.style.position = 'relative'
  slider.style.bottom = '0%'
  slider.style.left = '0px'
  slider.style.width = '87vw'
  slider.style.pointerEvents = 'painted'
  slider.classList.toggle('hiddenThumb')
  
  
  
  
  
  addMusicBtn.style.opacity = '100%'
  
  playPause.style.position = 'relative'
  playPause.style.transition = '0s'
  playPause.style.bottom = '0px'
  playPause.style.right = '0px'
  playPause.style.height = '78px'
  playPause.style.width = '78px'
  
  
  appContents.style.height = '100dvh'
  
  appContents.style.overflowY = 'scroll'
  appContents.style.overflowX = 'hidden'
  appContents.style.position = '0'
  appContents.style.bottom = '0%'
  appContents.style.borderRadius = '0px'
  appContents.style.transition = ' 0.45s ease'
  appContents.style.zIndex = '2'
  appContents.style.maxHeight = '100%'
}






//CRIA AS PLAYLISTS
const formCreatePlaylist = document.getElementById('formPlaylist')

const createPlaylistDiv = document.getElementById('playlistDados')
const imageOfPlaylist = document.getElementById('imageOfPlaylist')

const previewPhoto = document.getElementById('photoPlaylistDiv')
const savePlaylistBtn = document.getElementById('savePlaylist')
const errorsText = document.getElementById('errorsText')



let photo;


let totalPlaylistCreated = []
let playlistCreated = []

imageOfPlaylist.addEventListener('change', (ev) => {
  let photo = ev.target.files[0]
  try {
    
    if (photo) {
      const obj = URL.createObjectURL(photo)
      console.log(photo.name)
      
      previewPhoto.style.background = `url(${photo.name})`
    }
  } catch (e) {
    console.log(e)
  }
})




formCreatePlaylist.onsubmit = (ev) => {
  ev.preventDefault()
  
  try {
    const playlistName = ev.target.playlistName.value
    
    const playlists = document.getElementById('playlistsAndOthers')
    const descName = ev.target.descName.value
    const defaultPhoto = '/assets/imgs/muse AppLogo.jpg'
    
    if (playlistName.length < 4) {
      errorsText.innerText = '*Mínimo de 5 caracteres'
      return;
      
    } else {
      errorsText.innerText = ''
    }
    
    
    
    
    console.log('enviado!!')
    console.log(formCreatePlaylist)
    
    
    
    playlistCreated = [{
      id: Date.now(),
      name: playlistName,
      desc: descNa
