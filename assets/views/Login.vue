<template>
  <div>
    <b-row class="h90" align-v="center" align-h="center">
      <b-col sm="10" md="8" lg="6">
        <b-card title="Login" style="width: 100%" class="shadow">
          <b-form @submit.prevent="submit">
            <b-form-group id="email-input-group" label-for="email-input">
              <b-input-group class="mb-2">
                <b-form-input
                    type="email"
                    aria-label="Email"
                    placeholder="Email"
                    v-model="form.email">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group id="password-input-group" label-for="password-input">
              <b-input-group class="mb-2">
                <b-form-input
                    type="password"
                    aria-label="Password"
                    placeholder="Password"
                    v-model="form.password">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-button block type="submit" variant="outline-primary">
                Login
              </b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async submit() {
      await this.login(this.form)
          .then(() => {
            this.$router.replace({
              name: 'dashboard'
            })
          });
    },
  }
}
</script>

<style scoped>

</style>