const app = () => {
    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const outline = document.querySelector(".moving-outline circle")
    const video = document.querySelector(".vid-container video")

    // sounds
    const sounds = document.querySelectorAll(".sound-selector button")

    //time-display
    const timeDisplay = document.querySelector('.time-display')

    // time-selection
    const timeSelect = document.querySelectorAll(".timer button")

    //get the length of the outline
    const outlineLength = outline.getTotalLength()
    console.log(outlineLength)

    //Duration
    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src = this.getAttribute("data-sound")
            video.style.width = "100%"
            video.src = this.getAttribute("data-video")
            
            checkplaying(song)
        })
    })

    // play sound
    play.addEventListener("click", () => {
        checkplaying(song)
    })

    // sound select
    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time")
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration%60)}`
        })
    })

    // stop and play sound
    const checkplaying = song => {
    if (song.paused){
        song.play()
        video.play()
        play.src = "./svg/pause.svg" 
    }else{
        song.pause()
        play.src = "./svg/play.svg"
    }
    }

    // animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)

        // animate circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`

        if(currentTime >= fakeDuration){
            song.pause()
            song.currentTime = 0
            play.src = "./svg/play.svg"
            video.pause()
        }
    }

}
app()