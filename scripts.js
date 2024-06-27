document.addEventListener("DOMContentLoaded", function() {
  const leftSidebar = document.getElementById("left-sidebar");
  const rightSidebar = document.getElementById("right-sidebar");
  const toggleLeftBtn = document.getElementById("toggle-left");
  const toggleRightBtn = document.getElementById("toggle-right");

  toggleLeftBtn.addEventListener("click", function() {
    leftSidebar.classList.toggle("hidden");
  });

  toggleRightBtn.addEventListener("click", function() {
    rightSidebar.classList.toggle("hidden");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const taskID = 18882; // Assuming we are showing task with ID 18882, this can be dynamic

  // Fetch the JSON data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const task = data.tasks.find(t => t.task_id === taskID);
      if (!task) {
        console.error('Task not found');
        return;
      }

      const mainContent = document.querySelector('.main-content');
      
      // Create and append each asset container to the page
      task.assets.forEach(asset => {
        const assetContainer = createAssetContainer(asset);
        mainContent.appendChild(assetContainer);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function createAssetContainer(asset) {
  const assetDiv = document.createElement('div');
  assetDiv.classList.add('card');

  const h3 = document.createElement('h3');
  h3.textContent = asset.asset_title;
  assetDiv.appendChild(h3);

  // Trim description to 50 words
  const descriptionWords = asset.asset_description.trim().split(/\s+/);
  const trimmedDescription = descriptionWords.slice(0, 50).join(' ');

  const p = document.createElement('p');
  p.textContent = `Description: ${trimmedDescription}${descriptionWords.length > 50 ? '...' : ''}`;
  assetDiv.appendChild(p);

  if (asset.asset_content_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '200';
    iframe.src = asset.asset_content.trim();
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    assetDiv.appendChild(iframe);
  } else if (asset.asset_content_type === 'article') {
    const link = document.createElement('a');
    link.href = asset.asset_content.trim();
    link.textContent = 'Read more';
    link.target = '_blank'; // Ensure the link opens in a new tab
    assetDiv.appendChild(link);
  } else if (asset.asset_content_type === 'threadbuilder') {
    const threadDiv = document.createElement('div');
    threadDiv.classList.add('thread');

    const threadH4 = document.createElement('h4');
    threadH4.textContent = asset.asset_title;
    threadDiv.appendChild(threadH4);

    // Add thread builder elements as needed
    const subThreadDiv = document.createElement('div');
    subThreadDiv.classList.add('sub-thread');

    const subThreadInput1 = document.createElement('input');
    subThreadInput1.type = 'text';
    subThreadInput1.placeholder = 'Sub thread 1';
    subThreadDiv.appendChild(subThreadInput1);

    const subThreadInput2 = document.createElement('input');
    subThreadInput2.type = 'text';
    subThreadInput2.placeholder = 'Sub Interpretation 1';
    subThreadDiv.appendChild(subThreadInput2);

    threadDiv.appendChild(subThreadDiv);

    const summaryTextarea = document.createElement('textarea');
    summaryTextarea.placeholder = 'Summary for Thread A';
    threadDiv.appendChild(summaryTextarea);

    const addSubThreadButton = document.createElement('button');
    addSubThreadButton.classList.add('add-sub-thread');
    addSubThreadButton.textContent = '+ Sub-thread';
    threadDiv.appendChild(addSubThreadButton);

    assetDiv.appendChild(threadDiv);
  }

  return assetDiv;
}
