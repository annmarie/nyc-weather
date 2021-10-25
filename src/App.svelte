<script>
  export let getPointsOfWeather;
  export let getTimeStamp;
  let pointsOfWeather_promise = getPointsOfWeather();
  let pageLoadTimeStamp = getTimeStamp();

  setInterval(() => {
    pointsOfWeather_promise = getPointsOfWeather();
    pageLoadTimeStamp = getTimeStamp();
  }, 60000);
</script>

<main>
  {#await pointsOfWeather_promise}
    <p>Fetching weather forecast for NYC...</p>
  {:then pointsOfWeather}
    <ul>
      {#each pointsOfWeather as pow}
        <li>
          <span class="desc">{pow.desc}:</span>
          <span>{pow.details}</span>
        </li>
      {/each}
    </ul>
    <div>
      <span class="desc">updated at:</span>
      <span>{pageLoadTimeStamp}</span>
    </div>
  {:catch error}
    <p class="error">{error}</p>
  {/await}
</main>

<style>
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .error {
    color: red;
  }

  .desc {
    font-weight: 700;
  }

  li {
    padding: 5px;
  }
</style>
