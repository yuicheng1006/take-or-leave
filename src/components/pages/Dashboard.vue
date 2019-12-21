<template>
  <div class="wrap">
    <a name="HEAD"></a>
    <Navbar />
    <div class="infoWrap">
      <MemberCenterList />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";
import MemberCenterList from "../MemberCenterList";

export default {
  components: {
    Navbar,
    MemberCenterList
  }
};
</script>