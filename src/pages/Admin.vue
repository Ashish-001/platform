<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BrandMark from '../components/BrandMark.vue'
import CategoryForm from '../components/admin/CategoryForm.vue'
import LanguageForm from '../components/admin/LanguageForm.vue'
import TranslationsPanel from '../components/admin/TranslationsPanel.vue'
import PostForm from '../components/admin/PostForm.vue'
import ServiceForm from '../components/admin/ServiceForm.vue'
import { useAdminAuth } from '../composables/useAdminAuth'
import { formatDate, postLanguages, posts, sortedPosts } from '../data/blog'
import { languages } from '../data/languages'
import { serviceCategories, services, servicesInCategory } from '../data/services'
import {
  contentMeta,
  makeDefaultLanguage,
  removeCategory,
  removeLanguage,
  removePost,
  removeService,
  upsertCategory,
  upsertLanguage,
  upsertPost,
  upsertService,
} from '../stores/content'

const { authed, signIn, signOut } = useAdminAuth()

const credentials = ref({ username: '', password: '' })
const loginError = ref('')

const tab = ref('overview')
const editingPost = ref(null)
const editingService = ref(null)
const showPostForm = ref(false)
const showServiceForm = ref(false)
const editingCategory = ref(null)
const showCategoryForm = ref(false)
const editingLanguage = ref(null)
const showLanguageForm = ref(false)
const toast = ref('')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'posts', label: 'Blog posts' },
  { id: 'services', label: 'Services' },
  { id: 'categories', label: 'Categories' },
  { id: 'languages', label: 'Languages' },
  { id: 'translations', label: 'Translations' },
]

const postList = computed(() => sortedPosts.value)
const serviceList = computed(() => [...services].sort((a, b) => a.category.localeCompare(b.category)))

const sourceLabel = computed(
  () =>
    ({
      repo: 'Repo content',
      published: 'Published content',
      draft: 'Saved in this browser',
    })[contentMeta.source] ?? 'Repo content',
)

onMounted(() => {
  document.title = 'Admin — Service'
  let meta = document.querySelector('meta[name="robots"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', 'noindex, nofollow')
})

function flash(message) {
  toast.value = message
  setTimeout(() => (toast.value = ''), 2600)
}

function login() {
  if (signIn(credentials.value.username, credentials.value.password)) {
    loginError.value = ''
    credentials.value = { username: '', password: '' }
    return
  }
  loginError.value = 'Those credentials do not match.'
}

/* Posts */
function newPost() {
  editingPost.value = null
  showPostForm.value = true
}

function editPost(post) {
  editingPost.value = post
  showPostForm.value = true
}

function savePost({ post, originalSlug }) {
  upsertPost(post, originalSlug)
  showPostForm.value = false
  editingPost.value = null
  flash(originalSlug ? 'Post updated and saved locally.' : 'Post added and saved locally.')
}

function deletePost(post) {
  if (!confirm(`Delete “${post.title}”?`)) return
  removePost(post.slug)
  flash('Post deleted.')
}

/* Services */
function newService() {
  editingService.value = null
  showServiceForm.value = true
}

function editService(service) {
  editingService.value = service
  showServiceForm.value = true
}

function saveService({ service, originalId }) {
  upsertService(service, originalId)
  showServiceForm.value = false
  editingService.value = null
  flash(originalId ? 'Service updated and saved locally.' : 'Service added and saved locally.')
}

function deleteService(service) {
  if (!confirm(`Delete “${service.title}”?`)) return
  removeService(service.id)
  flash('Service deleted.')
}

/* Languages */
const postCountIn = (code) => posts.filter((p) => postLanguages(p).includes(code)).length

/** Posts that would show nowhere if this language went away. */
const postsOnlyIn = (code) => posts.filter((p) => p.languages?.length === 1 && p.languages[0] === code)

function newLanguage() {
  editingLanguage.value = null
  showLanguageForm.value = true
}

function editLanguage(language) {
  editingLanguage.value = language
  showLanguageForm.value = true
}

function saveLanguage({ language, originalCode }) {
  upsertLanguage(language, originalCode)
  showLanguageForm.value = false
  editingLanguage.value = null
  flash(originalCode ? 'Language updated and saved locally.' : 'Language added and saved locally.')
}

function setDefaultLanguage(language) {
  makeDefaultLanguage(language.code)
  flash(`${language.name} is now the default language.`)
}

function deleteLanguage(language) {
  if (languages[0]?.code === language.code) {
    alert('Make another language the default before deleting this one.')
    return
  }
  const stranded = postsOnlyIn(language.code).length
  if (stranded) {
    alert(
      `${stranded} post${stranded === 1 ? ' is' : 's are'} only in ${language.name}. Add another language to ${stranded === 1 ? 'it' : 'them'} or delete ${stranded === 1 ? 'it' : 'them'} first.`,
    )
    return
  }
  if (!confirm(`Delete ${language.name}? Every /${language.code}/ URL will send visitors to the default language.`))
    return
  removeLanguage(language.code)
  flash('Language deleted.')
}

/* Categories */
function newCategory() {
  editingCategory.value = null
  showCategoryForm.value = true
}

function editCategory(category) {
  editingCategory.value = category
  showCategoryForm.value = true
}

function saveCategory({ category, originalSlug }) {
  upsertCategory(category, originalSlug)
  showCategoryForm.value = false
  editingCategory.value = null
  flash(originalSlug ? 'Category updated and saved locally.' : 'Category added and saved locally.')
}

function deleteCategory(category) {
  const count = servicesInCategory(category.slug).length
  if (count) {
    alert(`“${category.name}” still has ${count} service${count === 1 ? '' : 's'}. Move or delete them first.`)
    return
  }
  if (serviceCategories.length === 1) {
    alert('The site needs at least one category.')
    return
  }
  if (!confirm(`Delete “${category.name}”?`)) return
  removeCategory(category.slug)
  flash('Category deleted.')
}
</script>

<template>
  <!-- Login gate -->
  <div v-if="!authed" class="flex min-h-screen items-center justify-center px-5 py-16">
    <div class="card w-full max-w-sm p-8">
      <BrandMark />
      <h1 class="h3 mt-6 text-xl">Admin sign in</h1>
      <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
        This panel is unlisted, not protected. Anyone with the bundle can read these credentials.
      </p>

      <form class="mt-6 space-y-3.5" @submit.prevent="login">
        <div>
          <label class="label" for="admin-user">Username</label>
          <input
            id="admin-user"
            v-model="credentials.username"
            type="text"
            autocomplete="username"
            class="field"
            required
          />
        </div>
        <div>
          <label class="label" for="admin-pass">Password</label>
          <input
            id="admin-pass"
            v-model="credentials.password"
            type="password"
            autocomplete="current-password"
            class="field"
            required
          />
        </div>

        <p
          v-if="loginError"
          class="rounded-xl bg-red-50 px-4 py-2.5 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {{ loginError }}
        </p>

        <button type="submit" class="btn-primary w-full">Sign in</button>
      </form>

      <RouterLink to="/" class="mt-6 block text-center text-[12.5px] text-slate-400 hover:text-indigo-600"
        >← Back to site</RouterLink
      >
    </div>
  </div>

  <!-- Panel -->
  <div v-else class="min-h-screen">
    <header class="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div class="shell flex flex-wrap items-center justify-between gap-4 py-4">
        <div class="flex items-center gap-4">
          <BrandMark />
          <span class="chip">Admin</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden text-[12px] text-slate-400 sm:block">{{ sourceLabel }}</span>
          <RouterLink to="/" class="btn-outline btn-sm">View site</RouterLink>
          <button type="button" class="btn-outline btn-sm" @click="signOut">Sign out</button>
        </div>
      </div>
      <div class="shell no-scrollbar flex gap-1 overflow-x-auto pb-3">
        <button
          v-for="item in tabs"
          :key="item.id"
          type="button"
          class="shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition"
          :class="
            tab === item.id
              ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-900 dark:text-indigo-300'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          "
          @click="tab = item.id"
        >
          {{ item.label }}
        </button>
      </div>
    </header>

    <div class="shell py-10">
      <p
        v-if="toast"
        class="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      >
        {{ toast }}
      </p>

      <!-- Overview -->
      <section v-if="tab === 'overview'" class="space-y-6">
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div class="card p-6">
            <p class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ postList.length }}</p>
            <p class="mt-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">blog posts</p>
          </div>
          <div class="card p-6">
            <p class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ serviceList.length }}</p>
            <p class="mt-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">services</p>
          </div>
          <div class="card p-6">
            <p class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ serviceCategories.length }}</p>
            <p class="mt-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">service categories</p>
          </div>
          <div class="card p-6">
            <p class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ languages.length }}</p>
            <p class="mt-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">languages</p>
          </div>
        </div>

        <div class="card p-7">
          <h2 class="h3 text-lg">How saving works</h2>
          <p class="mt-3 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
            Posts, services, categories and languages you add or edit here save to this browser straight away and show up across the site —
            blog, services, navigation and sitemap. Because the site is static with no backend, those edits live in this
            browser only, so clearing site data will lose them.
          </p>
          <p v-if="contentMeta.savedAt" class="mt-5 text-[12px] text-slate-400">
            Last saved {{ new Date(contentMeta.savedAt).toLocaleString() }}
          </p>
        </div>
      </section>

      <!-- Posts -->
      <section v-else-if="tab === 'posts'">
        <div v-if="showPostForm" class="card p-7">
          <h2 class="h3 text-lg">{{ editingPost ? 'Edit post' : 'New post' }}</h2>
          <div class="mt-6">
            <PostForm :post="editingPost" @save="savePost" @cancel="showPostForm = false" />
          </div>
        </div>

        <template v-else>
          <div class="flex items-center justify-between">
            <h2 class="h3 text-lg">Blog posts</h2>
            <button type="button" class="btn-primary btn-sm" @click="newPost">New post</button>
          </div>

          <div class="card mt-6 divide-y divide-slate-200/80 dark:divide-slate-800">
            <article v-for="post in postList" :key="post.slug" class="flex flex-wrap items-center gap-4 p-5">
              <div class="min-w-0 flex-1">
                <p class="text-[11.5px] font-semibold text-indigo-600 dark:text-indigo-400">{{ post.category }}</p>
                <h3 class="mt-1 truncate font-display text-[15px] font-semibold text-slate-900 dark:text-white">
                  {{ post.title }}
                </h3>
                <p class="mt-1 text-[12px] text-slate-400">
                  {{ formatDate(post.date) }} · {{ post.readTime }} · /blog/{{ post.slug }}
                </p>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="code in postLanguages(post)"
                    :key="code"
                    class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400"
                    >{{ code }}</span
                  >
                </div>
              </div>
              <div class="flex shrink-0 gap-2">
                <RouterLink :to="`/${postLanguages(post)[0]}/blog/${post.slug}`" class="btn-outline btn-sm"
                  >View</RouterLink
                >
                <button type="button" class="btn-outline btn-sm" @click="editPost(post)">Edit</button>
                <button
                  type="button"
                  class="btn-sm rounded-xl border border-red-200 px-4 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-500/10"
                  @click="deletePost(post)"
                >
                  Delete
                </button>
              </div>
            </article>
          </div>
        </template>
      </section>

      <!-- Services -->
      <section v-else-if="tab === 'services'">
        <div v-if="showServiceForm" class="card p-7">
          <h2 class="h3 text-lg">{{ editingService ? 'Edit service' : 'New service' }}</h2>
          <div class="mt-6">
            <ServiceForm :service="editingService" @save="saveService" @cancel="showServiceForm = false" />
          </div>
        </div>

        <template v-else>
          <div class="flex items-center justify-between">
            <h2 class="h3 text-lg">Services</h2>
            <button type="button" class="btn-primary btn-sm" @click="newService">New service</button>
          </div>

          <div class="card mt-6 divide-y divide-slate-200/80 dark:divide-slate-800">
            <article v-for="service in serviceList" :key="service.id" class="flex flex-wrap items-center gap-4 p-5">
              <span class="text-xl" aria-hidden="true">{{ service.icon }}</span>
              <div class="min-w-0 flex-1">
                <p class="text-[11.5px] font-semibold text-indigo-600 dark:text-indigo-400">{{ service.category }}</p>
                <h3 class="mt-1 truncate font-display text-[15px] font-semibold text-slate-900 dark:text-white">
                  {{ service.title }}
                </h3>
                <p class="mt-1 text-[12px] text-slate-400">
                  {{ service.priceRange || 'no price set' }} · /services/{{ service.id }}
                </p>
              </div>
              <div class="flex shrink-0 gap-2">
                <RouterLink :to="`/services/${service.id}`" class="btn-outline btn-sm">View</RouterLink>
                <button type="button" class="btn-outline btn-sm" @click="editService(service)">Edit</button>
                <button
                  type="button"
                  class="btn-sm rounded-xl border border-red-200 px-4 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-500/10"
                  @click="deleteService(service)"
                >
                  Delete
                </button>
              </div>
            </article>
          </div>
        </template>
      </section>

      <!-- Languages -->
      <section v-else-if="tab === 'languages'">
        <div v-if="showLanguageForm" class="card p-7">
          <h2 class="h3 text-lg">{{ editingLanguage ? 'Edit language' : 'New language' }}</h2>
          <div class="mt-6">
            <LanguageForm :language="editingLanguage" @save="saveLanguage" @cancel="showLanguageForm = false" />
          </div>
        </div>

        <template v-else>
          <div class="flex items-center justify-between">
            <h2 class="h3 text-lg">Languages</h2>
            <button type="button" class="btn-primary btn-sm" @click="newLanguage">New language</button>
          </div>
          <p class="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            Every page is available under each language, e.g. /{{ languages[0]?.code }}/blog. Translate the site's text
            in the Translations tab; blog posts are tagged per language when you edit them.
          </p>

          <div class="card mt-6 divide-y divide-slate-200/80 dark:divide-slate-800">
            <article v-for="(language, i) in languages" :key="language.code" class="flex flex-wrap items-center gap-4 p-5">
              <span
                class="flex h-9 w-12 items-center justify-center rounded-lg bg-slate-100 text-[12px] font-bold text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
                >{{ language.code }}</span
              >
              <div class="min-w-0 flex-1">
                <h3 class="flex items-center gap-2 font-display text-[15px] font-semibold text-slate-900 dark:text-white">
                  {{ language.name }}
                  <span v-if="i === 0" class="chip">Default</span>
                </h3>
                <p class="mt-1 text-[12px] text-slate-400">
                  {{ postCountIn(language.code) }} posts · /{{ language.code }}/
                </p>
              </div>
              <div class="flex shrink-0 flex-wrap gap-2">
                <RouterLink :to="`/${language.code}`" class="btn-outline btn-sm">View</RouterLink>
                <button v-if="i !== 0" type="button" class="btn-outline btn-sm" @click="setDefaultLanguage(language)">
                  Make default
                </button>
                <button type="button" class="btn-outline btn-sm" @click="editLanguage(language)">Edit</button>
                <button
                  type="button"
                  class="btn-sm rounded-xl border border-red-200 px-4 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-500/10"
                  @click="deleteLanguage(language)"
                >
                  Delete
                </button>
              </div>
            </article>
          </div>
        </template>
      </section>

      <!-- Translations -->
      <section v-else-if="tab === 'translations'">
        <TranslationsPanel />
      </section>

      <!-- Categories -->
      <section v-else-if="tab === 'categories'">
        <div v-if="showCategoryForm" class="card p-7">
          <h2 class="h3 text-lg">{{ editingCategory ? 'Edit category' : 'New category' }}</h2>
          <div class="mt-6">
            <CategoryForm :category="editingCategory" @save="saveCategory" @cancel="showCategoryForm = false" />
          </div>
        </div>

        <template v-else>
          <div class="flex items-center justify-between">
            <h2 class="h3 text-lg">Service categories</h2>
            <button type="button" class="btn-primary btn-sm" @click="newCategory">New category</button>
          </div>

          <div class="card mt-6 divide-y divide-slate-200/80 dark:divide-slate-800">
            <article
              v-for="category in serviceCategories"
              :key="category.slug"
              class="flex flex-wrap items-center gap-4 p-5"
            >
              <span class="text-xl" aria-hidden="true">{{ category.icon }}</span>
              <div class="min-w-0 flex-1">
                <h3 class="truncate font-display text-[15px] font-semibold text-slate-900 dark:text-white">
                  {{ category.name }}
                </h3>
                <p class="mt-1 text-[12px] text-slate-400">
                  {{ servicesInCategory(category.slug).length }} services · /services/category/{{ category.slug }}
                </p>
              </div>
              <div class="flex shrink-0 gap-2">
                <RouterLink :to="`/services/category/${category.slug}`" class="btn-outline btn-sm">View</RouterLink>
                <button type="button" class="btn-outline btn-sm" @click="editCategory(category)">Edit</button>
                <button
                  type="button"
                  class="btn-sm rounded-xl border border-red-200 px-4 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-500/10"
                  @click="deleteCategory(category)"
                >
                  Delete
                </button>
              </div>
            </article>
          </div>
        </template>
      </section>
    </div>
  </div>
</template>
