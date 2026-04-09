function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();

  if (task === "") return;

  let li = document.createElement("li");
  let deleteBtn = 
   document.createElement("span");
deleteBtn.textContent = " ✕";
deleteBtn.style.cursor = "pointer";
deleteBtn.style.marginLeft = "10px";
deleteBtn.style.color = "#ef4444";
  li.textContent = task;
  li.appendChild(deleteBtn);

  li.onclick = function () {
    li.classList.toggle("done");
    checkRewards();
    updateProgress();
    saveData();
  };
  deleteBtn.onclick = function (event) {
  event.stopPropagation();
  li.remove();
  checkRewards();
  updateProgress();
    saveData();
};

  document.getElementById("taskList").appendChild(li);

  input.value = "";
  checkRewards();
  updateProgress();
 saveData();
}

function addReward() {
  let input = document.getElementById("rewardInput");
  let reward = input.value.trim();

  if (reward === "") return;

  let li = document.createElement("li");
  let deleteBtn = document.createElement("span");
deleteBtn.textContent = " ✕";
deleteBtn.style.cursor = "pointer";
deleteBtn.style.marginLeft = "10px";
deleteBtn.style.color = "#ef4444";
  li.textContent = reward;
  li.appendChild(deleteBtn);
  li.classList.add("reward-locked");
  li.style.opacity = "0.3";
  li.style.pointerEvents = "none";

  document.getElementById("rewardList").appendChild(li);

  input.value = "";
  checkRewards();
  deleteBtn.onclick = function (event) {
  event.stopPropagation();
  li.remove();
  checkRewards();
  updateProgress();
    saveData();
};
updateProgress();
  saveData();
}

function checkRewards() {
  let tasks = document.querySelectorAll("#taskList li");
  let rewards = document.querySelectorAll("#rewardList li");
  let successMessage = document.getElementById("successMessage");

  let allDone = true;

  tasks.forEach(task => {
    if (!task.classList.contains("done")) {
      allDone = false;
    }
  });

  rewards.forEach(reward => {
    if (allDone && tasks.length > 0) {
      reward.style.opacity = "1";
      reward.style.pointerEvents = "auto";
      reward.classList.remove("reward-locked");
      reward.classList.add("reward-open");
    } else {
      reward.style.opacity = "0.3";
      reward.style.pointerEvents = "none";
      reward.classList.remove("reward-open");
      reward.classList.add("reward-locked");
    }
  });

  if (allDone && tasks.length > 0) {
    successMessage.style.display = "block";
  } else {
    successMessage.style.display = "none";
  }
}

function updateProgress() {
  let tasks = document.querySelectorAll("#taskList li");
  let done = document.querySelectorAll("#taskList li.done");

  if (tasks.length === 0) {
    document.getElementById("progress").style.width = "0%";
    return;
  }

  let percent = (done.length / tasks.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}
function saveData() {
  localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
  localStorage.setItem("rewards", document.getElementById("rewardList").innerHTML);
}

function attachTaskEvents() {
  let tasks = document.querySelectorAll("#taskList li");
  tasks.forEach(li => {
    let deleteBtn = li.querySelector("span");

    if (deleteBtn) {
      deleteBtn.onclick = function (event) {
        event.stopPropagation();
        li.remove();
        checkRewards();
        updateProgress();
        saveData();
      };
    }

    li.onclick = function (event) {
      if (event.target.tagName === "SPAN") return;
      li.classList.toggle("done");
      checkRewards();
      updateProgress();
      saveData();
    };
  });
}

function attachRewardEvents() {
  let rewards = document.querySelectorAll("#rewardList li");
  rewards.forEach(li => {
    let deleteBtn = li.querySelector("span");

    if (deleteBtn) {
      deleteBtn.onclick = function (event) {
        event.stopPropagation();
        li.remove();
        checkRewards();
        updateProgress();
        saveData();
      };
    }
  });
}

function loadData() {
  document.getElementById("taskList").innerHTML = localStorage.getItem("tasks") || "";
  document.getElementById("rewardList").innerHTML = localStorage.getItem("rewards") || "";

  attachTaskEvents();
  attachRewardEvents();
  checkRewards();
  updateProgress();
}

loadData();
function createAccount() {
  const message = document.createElement("div");
  message.innerText = "Account created successfully 🎉";

  message.style.position = "fixed";
  message.style.top = "20px";
  message.style.right = "20px";
  message.style.background = "#22c55e";
  message.style.color = "#000";
  message.style.padding = "12px 20px";
  message.style.borderRadius = "8px";
  message.style.fontWeight = "bold";
  message.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
  message.style.zIndex = "999";

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}
