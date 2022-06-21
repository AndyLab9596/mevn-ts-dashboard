<template>
    <section class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8">
        <form class="w-full">
            <h3 class="text-3xl mb-4">Search Form</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 pt-4">
                <BaseInputFormField label="Search" type="text" name="search" v-model="searchInput" />
                <BaseSelectFormField label="Status" name="searchStatus" v-model="searchStatus"
                    :options="searchStatusOptions" />
                <BaseSelectFormField label="Job Type" name="searchType" v-model="searchType"
                    :options="searchJobTypeOptions" />
                <BaseSelectFormField label="Sort" name="sort" v-model="sort" :options="sortOptions" />
                <div class="h-[36px] mt-[35px] w-full">
                    <BaseButton type="button" is-dangerouse-style @click="globalStore.clearSearchForm">
                        Clear Filters
                    </BaseButton>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import { TSearchJobType, TSearchStatus, TSort } from '@/models/jobTypes';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { computed, WritableComputedRef } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInputFormField from '../ui/BaseInputFormField.vue';

const globalStore = useGlobalStore();
const { searchStatusOptions, searchJobTypeOptions, sortOptions } = storeToRefs(globalStore);

const searchInput: WritableComputedRef<string> = computed({
    get() {
        return globalStore.search
    },
    set(value: string): void {
        return globalStore.changeJobSearch('search', value)
    }
});

const searchStatus: WritableComputedRef<TSearchStatus> = computed({
    get() {
        return globalStore.searchStatus
    },
    set(value: TSearchStatus): void {
        return globalStore.changeJobSearch('searchStatus', value);
    }
});

const searchType: WritableComputedRef<TSearchJobType> = computed({
    get() {
        return globalStore.searchType
    },
    set(value: TSearchJobType): void {
        return globalStore.changeJobSearch('searchType', value);
    }
});

const sort: WritableComputedRef<TSort> = computed({
    get() {
        return globalStore.sort
    },
    set(value: TSort): void {
        return globalStore.changeJobSearch('sort', value);
    }
});


</script>
