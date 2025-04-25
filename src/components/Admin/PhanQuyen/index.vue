<template>
    <div class="phan-quyen-container">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Phân quyền cho chức vụ</h3>
            </div>
            <div class="card-body">
                <div class="permissions-grid">
                    <!-- Column 1: Positions List -->
                    <div class="grid-column">
                        <h4>Danh sách chức vụ</h4>
                        <div class="position-list">
                            <div v-for="position in positions" :key="position.id" class="position-item"
                                :class="{ 'active': selectedPositionId === position.id }"
                                @click="selectedPositionId = position.id; loadPermissions()">
                                {{ position.tenChucVu }}
                            </div>
                        </div>
                    </div>

                    <!-- Column 2: All Permissions -->
                    <div class="grid-column">
                        <h4>Danh sách quyền</h4>
                        <div class="permission-items">
                            <div v-for="permission in allPermissions" :key="permission.id" class="permission-item">
                                <label class="form-check">
                                    <input type="checkbox" class="form-check-input" :value="permission.id"
                                        :disabled="!selectedPositionId || !permissions.canAssign" v-model="selectedPermissions" />
                                    <span class="form-check-label">{{ permission.tenQuyen }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="actions mt-4" v-if="selectedPositionId && permissions.canAssign">
                            <button class="btn btn-primary w-100 mb-2" @click="handleAssignPermissions"
                                :disabled="selectedPermissions.length === 0">
                                Lưu phân quyền
                            </button>
                            <button class="btn btn-danger w-100" @click="handleRemoveAllPermissions"
                                :disabled="selectedPermissions.length === 0">
                                Xóa quyền đã chọn
                            </button>
                        </div>
                    </div>

                    <!-- Column 3: Assigned Permissions -->
                    <div class="grid-column">
                        <h4>Quyền đã cấp</h4>
                        <div class="assigned-permissions" v-if="selectedPositionId">
                            <div v-for="permission in currentPositionPermissions" :key="permission.permission.id"
                                class="assigned-permission-item">
                                {{ permission.permission.tenQuyen }}
                            </div>
                            <div v-if="currentPositionPermissions.length === 0" class="no-permissions">
                                Chưa có quyền nào được cấp
                            </div>
                        </div>
                        <div v-else class="no-position-selected">
                            Vui lòng chọn chức vụ để xem quyền đã cấp
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

export default {
    name: 'PhanQuyen',
    setup() {
        const toaster = createToaster({ position: "top-right" });
        const selectedPositionId = ref('')
        const positions = ref([])
        const allPermissions = ref([])
        const selectedPermissions = ref([])
        const currentPositionPermissions = ref([])
        const permissions = ref({
            canView: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false,
            canAssign: false
        });

        const loadPositions = async () => {
            try {
                const response = await axios.get('/api/admin/chuc-vu', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                positions.value = response.data.data
            } catch (error) {
                toaster.error('Không thể tải danh sách chức vụ')
            }
        }

        const loadAllPermissions = async () => {
            try {
                const response = await axios.get('/api/admin/quyen', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                allPermissions.value = response.data.data
            } catch (error) {
                toaster.error('Không thể tải danh sách quyền')
            }
        }

        const loadPermissions = async () => {
            if (!selectedPositionId.value) return
            selectedPermissions.value = [] // Reset selections
            try {
                const response = await axios.get(`/api/admin/quyen/chuc-vu/${selectedPositionId.value}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                if (response.data.status) {
                    currentPositionPermissions.value = response.data.data
                    // Map the permission IDs correctly from the PositionPermission objects
                    selectedPermissions.value = currentPositionPermissions.value.map(pp => pp.permission.id)
                } else {
                    toaster.error(response.data.message || 'Không thể tải thông tin quyền của chức vụ')
                }
            } catch (error) {
                console.error('Error loading permissions:', error)
                toaster.error('Không thể tải thông tin quyền của chức vụ')
            }
        }

        const handleAssignPermissions = async () => {
            if (!selectedPositionId.value || selectedPermissions.value.length === 0) return
            try {
                await axios.post(
                    `/api/admin/quyen/chuc-vu/${selectedPositionId.value}/phan-quyen`,
                    JSON.stringify(selectedPermissions.value), // Chuyển đổi mảng thành JSON string
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token_admin')}`,
                            'Content-Type': 'application/json' // Thêm header này
                        },
                    }
                )
                toaster.success('Phân quyền thành công')
                await loadPermissions() // Reload permissions to sync state
            } catch (error) {
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi phân quyền')
            }
        }

        const handleRemoveAllPermissions = async () => {
            if (!selectedPositionId.value || selectedPermissions.value.length === 0) return;
            if (!confirm('Bạn có chắc chắn muốn xóa tất cả quyền đã chọn?')) return;

            try {
                // Gọi API xóa nhiều quyền với POST method
                await axios.post(
                    `/api/admin/quyen/chuc-vu/${selectedPositionId.value}/xoa-quyen`,
                    selectedPermissions.value,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token_admin')}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                toaster.success('Xóa quyền thành công');
                selectedPermissions.value = [];
                await loadPermissions(); // Reload permissions to sync state
            } catch (error) {
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa quyền');
                await loadPermissions(); // Reload to ensure UI is in sync
            }
        };

        const checkMultiplePermissions = async (maQuyenList) => {
            try {
                const queryString = maQuyenList.map(q => `maQuyen=${q}`).join('&');
                const response = await axios.get(
                    `/api/admin/quyen/chuc-vu/kiem-tra-nhieu-quyen?${queryString}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                        }
                    }
                );
                // Return the permissions object directly from the response data
                return response.data.data.permissions;
            } catch (error) {
                console.error('Error checking permissions:', error);
                // Return an object with all permissions set to false as default
                return {
                    PERMISSION_VIEW: false,
                    PERMISSION_CREATE: false,
                    PERMISSION_UPDATE: false,
                    PERMISSION_DELETE: false,
                    PERMISSION_ASSIGN: false
                };
            }
        };

        onMounted(async () => {
            // Check permissions when component is mounted
            const permissionResults = await checkMultiplePermissions([
                'PERMISSION_VIEW',
                'PERMISSION_CREATE',
                'PERMISSION_UPDATE',
                'PERMISSION_DELETE',
                'PERMISSION_ASSIGN'
            ]);
            
            // Update permissions based on the API response
            permissions.value = {
                canView: permissionResults.PERMISSION_VIEW === true,
                canCreate: permissionResults.PERMISSION_CREATE === true,
                canUpdate: permissionResults.PERMISSION_UPDATE === true,
                canDelete: permissionResults.PERMISSION_DELETE === true,
                canAssign: permissionResults.PERMISSION_ASSIGN === true
            };

            if (permissions.value.canView) {
                await loadPositions();
                await loadAllPermissions();
            } else {
                toaster.error("Bạn không có quyền xem danh sách phân quyền!");
            }
        });

        return {
            selectedPositionId,
            positions,
            allPermissions,
            selectedPermissions,
            currentPositionPermissions,
            permissions,
            loadPermissions,
            handleAssignPermissions,
            handleRemoveAllPermissions
        }
    }
}
</script>

<style scoped>
.phan-quyen-container {
    padding: 20px;
}

.permissions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.grid-column {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 15px;
}

.grid-column h4 {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
}

.position-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.position-item {
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.position-item:hover {
    background-color: #f9fafb;
}

.position-item.active {
    background-color: #e5e7eb;
    border-color: #d1d5db;
}

.permission-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: calc(60vh - 100px);
    /* Adjusted to accommodate buttons */
    overflow-y: auto;
    margin-bottom: 15px;
}

.permission-item {
    padding: 8px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.permission-item:hover {
    background-color: #f9fafb;
}

.assigned-permissions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 70vh;
    overflow-y: auto;
}

.assigned-permission-item {
    padding: 12px;
    background-color: #f3f4f6;
    border-radius: 6px;
    font-size: 0.9rem;
    border-left: 4px solid #4f46e5;
}

.no-permissions {
    text-align: center;
    color: #6b7280;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 6px;
    font-style: italic;
}

.no-position-selected {
    text-align: center;
    color: #6b7280;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 6px;
}

.form-check {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
}

.form-check-input {
    margin: 0;
}

.actions {
    border-top: 1px solid #e5e7eb;
    padding-top: 15px;
}
</style>
