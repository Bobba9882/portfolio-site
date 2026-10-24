export function BoidsInfo() {
  return <div className="flex flex-col gap-3 text-sm leading-relaxed">
    <p>
      Well this is the first thing i made!
    </p>
    <p>
      Years ago I watched a <a href="https://youtu.be/bqtqltqcQhw?si=1ACPe21HzgGT8jEC" target="_blank">video by Sebastian Lague</a> and it planted the idea in my head that I wanted to make this myself someday. I kept putting it off with excuses like
      “I don’t have anywhere to put it” and “setting something up to start working on this is just
      as much work”. Turns out I was just procrastinating and there was no reason to think like that. Now that I
      finally have a nice foundation for all the code-related things I wanted to do here, it is: my own boids sim!
    </p>

    <p>
      To build it I used an <a href="https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html" target="_blank">online paper about the boids algorithm</a>, and it was so much fun! With most of the stuff on this page I want to use as little AI as possible and make it
      feel like a puzzle again, and it was a lot of fun!
    </p>

    <p>
      Making a simulation like this is way easier than expected, because it mostly comes down to 3 rules:
    </p>
    <ul className="list-disc pl-5">
      <li><b>Separation:</b> every “boid” (bird-oid) steers away from neighbours that get too close, so they keep some distance from each other.</li>
      <li><b>Cohesion:</b> every boid tries to move towards the center of its neighbours.</li>
      <li><b>Alignment:</b> every boid tries to match its direction with its neighbours.</li>
    </ul>

    <p>
      These 3 simple rules create something super satisfying in the end. Playing around with the variables is a lot of
      fun too. I hope you find it as satisfying as I do! :)
    </p>
  </div>
}
