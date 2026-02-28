<!-- src/routes/debug/+page.svelte -->
<script>
  import { onMount } from "svelte";

  let apiResponse = null;
  let error = null;
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch(
        "/api/words?page=1&pageSize=10"
      );
      apiResponse = await res.json();
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  });
</script>

<h1>API Debug</h1>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <div style="color: red">
    <h2>Error</h2>
    <pre>{error.message}</pre>
  </div>
{:else if apiResponse}
  <div>
    <h2>Success: {apiResponse.success}</h2>
    <h3>Metadata:</h3>
    <pre>{JSON.stringify(apiResponse.meta, null, 2)}</pre>

    <h3>First 3 items:</h3>
    <pre>{JSON.stringify(
        apiResponse.data.slice(0, 3),
        null,
        2
      )}</pre>
  </div>
{/if}
