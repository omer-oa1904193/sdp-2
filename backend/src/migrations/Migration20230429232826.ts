import { Migration } from '@mikro-orm/migrations';

export class Migration20230429232826 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "admission_test" ("id" serial primary key, "name" varchar(255) not null, "max_score" numeric(10,0) not null);');

    this.addSql('create table "college" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "department" ("id" serial primary key, "name" varchar(255) not null, "code" varchar(255) not null, "college_id" int null);');

    this.addSql('create table "course" ("id" serial primary key, "title" varchar(255) not null, "code" varchar(255) not null, "credit_hours" int not null, "description" text not null, "cost" real not null, "department_id" int not null, "prerequisites" jsonb not null default \'{"and": []}\');');

    this.addSql('create table "elective_package" ("id" serial primary key, "title" varchar(255) not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null);');

    this.addSql('create table "instructor" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "map_course_elective_package" ("id" serial primary key, "course_id" int not null, "elective_package_id" int not null);');
    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_course_id_elective_package_id_unique" unique ("course_id", "elective_package_id");');

    this.addSql('create table "program" ("id" serial primary key, "name" varchar(255) not null, "department_id" int not null, "year_created" int not null);');

    this.addSql('create table "map_elective_package_program" ("id" serial primary key, "elective_package_id" int not null, "program_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "map_course_program" ("id" serial primary key, "course_id" int not null, "program_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null);');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_course_id_program_id_unique" unique ("course_id", "program_id");');

    this.addSql('create table "section" ("id" serial primary key, "course_id" int not null, "type" text check ("type" in (\'Lecture\', \'Lab\')) not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "instructor_id" int not null);');

    this.addSql('create table "section_time_slot" ("id" serial primary key, "day_of_week" text check ("day_of_week" in (\'Sunday\', \'Monday\', \'Tuesday\', \'Wednesday\', \'Thursday\', \'Friday\', \'Saturday\')) not null, "start_time" time(0) not null, "end_time" time(0) not null, "section_id" int not null);');

    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'Student\', \'Academic Advisor\', \'Program Coordinator\')) not null, "name" varchar(255) null, "university_id" varchar(255) null, "enrollment_season" text check ("enrollment_season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) null, "enrollment_year" int null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "study_plan" ("id" serial primary key, "name" varchar(255) not null, "program_id" int not null, "author_id" int not null);');

    this.addSql('create table "map_elective_package_study_plan" ("id" serial primary key, "elective_package_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "map_course_study_plan" ("id" serial primary key, "course_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null);');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_course_id_study_plan_id_unique" unique ("course_id", "study_plan_id");');

    this.addSql('create table "comment" ("id" serial primary key, "text" varchar(255) not null, "time_posted" timestamptz(0) not null default now(), "study_plan_id" int not null, "author_id" int not null);');

    this.addSql('create table "admission_test_result" ("id" serial primary key, "admission_test_id" int not null, "student_id" int not null, "score" numeric(10,0) not null);');
    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_admission_test_id_student_id_unique" unique ("admission_test_id", "student_id");');

    this.addSql('alter table "department" add constraint "department_college_id_foreign" foreign key ("college_id") references "college" ("id") on update cascade on delete set null;');

    this.addSql('alter table "course" add constraint "course_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;');

    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');

    this.addSql('alter table "program" add constraint "program_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;');

    this.addSql('alter table "map_elective_package_program" add constraint "map_elective_package_program_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');
    this.addSql('alter table "map_elective_package_program" add constraint "map_elective_package_program_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');

    this.addSql('alter table "map_course_program" add constraint "map_course_program_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');

    this.addSql('alter table "section" add constraint "section_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "section" add constraint "section_instructor_id_foreign" foreign key ("instructor_id") references "instructor" ("id") on update cascade;');

    this.addSql('alter table "section_time_slot" add constraint "section_time_slot_section_id_foreign" foreign key ("section_id") references "section" ("id") on update cascade;');

    this.addSql('alter table "study_plan" add constraint "study_plan_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');
    this.addSql('alter table "study_plan" add constraint "study_plan_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');
    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');

    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_admission_test_id_foreign" foreign key ("admission_test_id") references "admission_test" ("id") on update cascade;');
    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_student_id_foreign" foreign key ("student_id") references "user" ("id") on update cascade;');

  }

  async down(): Promise<void> {
    this.addSql('create schema if not exists "auth";');

    this.addSql('create schema if not exists "storage";');

    this.addSql('alter table "admission_test_result" drop constraint "admission_test_result_admission_test_id_foreign";');

    this.addSql('alter table "department" drop constraint "department_college_id_foreign";');

    this.addSql('alter table "course" drop constraint "course_department_id_foreign";');

    this.addSql('alter table "program" drop constraint "program_department_id_foreign";');

    this.addSql('alter table "map_course_elective_package" drop constraint "map_course_elective_package_course_id_foreign";');

    this.addSql('alter table "map_course_program" drop constraint "map_course_program_course_id_foreign";');

    this.addSql('alter table "section" drop constraint "section_course_id_foreign";');

    this.addSql('alter table "map_course_study_plan" drop constraint "map_course_study_plan_course_id_foreign";');

    this.addSql('alter table "map_course_elective_package" drop constraint "map_course_elective_package_elective_package_id_foreign";');

    this.addSql('alter table "map_elective_package_program" drop constraint "map_elective_package_program_elective_package_id_foreign";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_elective_package_id_foreign";');

    this.addSql('alter table "section" drop constraint "section_instructor_id_foreign";');

    this.addSql('alter table "map_elective_package_program" drop constraint "map_elective_package_program_program_id_foreign";');

    this.addSql('alter table "map_course_program" drop constraint "map_course_program_program_id_foreign";');

    this.addSql('alter table "study_plan" drop constraint "study_plan_program_id_foreign";');

    this.addSql('alter table "section_time_slot" drop constraint "section_time_slot_section_id_foreign";');

    this.addSql('alter table "study_plan" drop constraint "study_plan_author_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_author_id_foreign";');

    this.addSql('alter table "admission_test_result" drop constraint "admission_test_result_student_id_foreign";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_study_plan_id_foreign";');

    this.addSql('alter table "map_course_study_plan" drop constraint "map_course_study_plan_study_plan_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_study_plan_id_foreign";');

    this.addSql('create table "auth"."audit_log_entries" ("instance_id" uuid null default null, "id" uuid not null default null, "payload" json null default null, "created_at" timestamptz null default null, "ip_address" varchar not null default \'\', constraint "audit_log_entries_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."audit_log_entries" is \'Auth: Audit trail for user actions.\';');
    this.addSql('create index "audit_logs_instance_id_idx" on "auth"."audit_log_entries" ("instance_id");');

    this.addSql('create table "storage"."buckets" ("id" text not null default null, "name" text not null default null, "owner" uuid null default null, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "public" bool null default false, "avif_autodetection" bool null default false, "file_size_limit" int8 null default null, "allowed_mime_types" text[] null default null, constraint "buckets_pkey" primary key ("id"));');
    this.addSql('alter table "storage"."buckets" add constraint "bname" unique ("name");');

    this.addSql('create table "auth"."flow_state" ("id" uuid not null default null, "user_id" uuid null default null, "auth_code" text not null default null, "code_challenge_method" code_challenge_method not null default null, "code_challenge" text not null default null, "provider_type" text not null default null, "provider_access_token" text null default null, "provider_refresh_token" text null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, "authentication_method" text not null default null, constraint "flow_state_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."flow_state" is \'stores metadata for pkce logins\';');
    this.addSql('create index "idx_auth_code" on "auth"."flow_state" ("auth_code");');
    this.addSql('create index "idx_user_id_auth_method" on "auth"."flow_state" ("user_id", "authentication_method");');

    this.addSql('create table "auth"."identities" ("id" text not null default null, "user_id" uuid not null default null, "identity_data" jsonb not null default null, "provider" text not null default null, "last_sign_in_at" timestamptz null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, "email" text null default null, constraint "identities_pkey" primary key ("provider", "id"));');
    this.addSql('comment on table "auth"."identities" is \'Auth: Stores identities associated to a user.\';');
    this.addSql('comment on column "auth"."identities"."email" is \'Auth: Email is a generated column that references the optional email property in the identity_data\';');
    this.addSql('create index "identities_email_idx" on "auth"."identities" ("email");');
    this.addSql('create index "identities_user_id_idx" on "auth"."identities" ("user_id");');

    this.addSql('create table "auth"."instances" ("id" uuid not null default null, "uuid" uuid null default null, "raw_base_config" text null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, constraint "instances_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."instances" is \'Auth: Manages users across multiple sites.\';');

    this.addSql('create table "auth"."mfa_amr_claims" ("session_id" uuid not null default null, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "authentication_method" text not null default null, "id" uuid not null default null, constraint "amr_id_pk" primary key ("id"));');
    this.addSql('comment on table "auth"."mfa_amr_claims" is \'auth: stores authenticator method reference claims for multi factor authentication\';');
    this.addSql('alter table "auth"."mfa_amr_claims" add constraint "mfa_amr_claims_session_id_authentication_method_pkey" unique ("session_id", "authentication_method");');

    this.addSql('create table "auth"."mfa_challenges" ("id" uuid not null default null, "factor_id" uuid not null default null, "created_at" timestamptz not null default null, "verified_at" timestamptz null default null, "ip_address" inet not null default null, constraint "mfa_challenges_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."mfa_challenges" is \'auth: stores metadata about challenge requests made\';');

    this.addSql('create table "auth"."mfa_factors" ("id" uuid not null default null, "user_id" uuid not null default null, "friendly_name" text null default null, "factor_type" factor_type not null default null, "status" factor_status not null default null, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "secret" text null default null, constraint "mfa_factors_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."mfa_factors" is \'auth: stores metadata about factors\';');
    this.addSql('create index "factor_id_created_at_idx" on "auth"."mfa_factors" ("user_id", "created_at");');
    this.addSql('alter table "auth"."mfa_factors" add constraint "mfa_factors_user_friendly_name_unique" unique ("friendly_name", "user_id");');

    this.addSql('create table "storage"."migrations" ("id" int4 not null default null, "name" varchar not null default null, "hash" varchar not null default null, "executed_at" timestamp null default CURRENT_TIMESTAMP, constraint "migrations_pkey" primary key ("id"));');
    this.addSql('alter table "storage"."migrations" add constraint "migrations_name_key" unique ("name");');

    this.addSql('create table "storage"."objects" ("id" uuid not null default uuid_generate_v4(), "bucket_id" text null default null, "name" text null default null, "owner" uuid null default null, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "last_accessed_at" timestamptz null default now(), "metadata" jsonb null default null, "path_tokens" text[] null default null, constraint "objects_pkey" primary key ("id"));');
    this.addSql('alter table "storage"."objects" add constraint "bucketid_objname" unique ("bucket_id", "name");');
    this.addSql('create index "name_prefix_search" on "storage"."objects" ("name");');

    this.addSql('create table "auth"."refresh_tokens" ("instance_id" uuid null default null, "id" bigserial primary key, "token" varchar null default null, "user_id" varchar null default null, "revoked" bool null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, "parent" varchar null default null, "session_id" uuid null default null);');
    this.addSql('comment on table "auth"."refresh_tokens" is \'Auth: Store of tokens used to refresh JWT tokens once they expire.\';');
    this.addSql('create index "refresh_tokens_instance_id_idx" on "auth"."refresh_tokens" ("instance_id");');
    this.addSql('create index "refresh_tokens_instance_id_user_id_idx" on "auth"."refresh_tokens" ("instance_id", "user_id");');
    this.addSql('create index "refresh_tokens_parent_idx" on "auth"."refresh_tokens" ("parent");');
    this.addSql('create index "refresh_tokens_session_id_revoked_idx" on "auth"."refresh_tokens" ("session_id", "revoked");');
    this.addSql('alter table "auth"."refresh_tokens" add constraint "refresh_tokens_token_unique" unique ("token");');

    this.addSql('create table "auth"."saml_providers" ("id" uuid not null default null, "sso_provider_id" uuid not null default null, "entity_id" text not null default null, "metadata_xml" text not null default null, "metadata_url" text null default null, "attribute_mapping" jsonb null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, constraint "saml_providers_pkey" primary key ("id"), constraint entity_id not empty check (char_length(entity_id) > 0), constraint metadata_url not empty check ((metadata_url = NULL::text) OR (char_length(metadata_url) > 0)), constraint metadata_xml not empty check (char_length(metadata_xml) > 0));');
    this.addSql('comment on table "auth"."saml_providers" is \'Auth: Manages SAML Identity Provider connections.\';');
    this.addSql('alter table "auth"."saml_providers" add constraint "saml_providers_entity_id_key" unique ("entity_id");');
    this.addSql('create index "saml_providers_sso_provider_id_idx" on "auth"."saml_providers" ("sso_provider_id");');

    this.addSql('create table "auth"."saml_relay_states" ("id" uuid not null default null, "sso_provider_id" uuid not null default null, "request_id" text not null default null, "for_email" text null default null, "redirect_to" text null default null, "from_ip_address" inet null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, constraint "saml_relay_states_pkey" primary key ("id"), constraint request_id not empty check (char_length(request_id) > 0));');
    this.addSql('comment on table "auth"."saml_relay_states" is \'Auth: Contains SAML Relay State information for each Service Provider initiated login.\';');
    this.addSql('create index "saml_relay_states_for_email_idx" on "auth"."saml_relay_states" ("for_email");');
    this.addSql('create index "saml_relay_states_sso_provider_id_idx" on "auth"."saml_relay_states" ("sso_provider_id");');

    this.addSql('create table "auth"."schema_migrations" ("version" varchar not null default null, constraint "schema_migrations_pkey" primary key ("version"));');
    this.addSql('comment on table "auth"."schema_migrations" is \'Auth: Manages updates to the auth system.\';');

    this.addSql('create table "auth"."sessions" ("id" uuid not null default null, "user_id" uuid not null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, "factor_id" uuid null default null, "aal" aal_level null default null, "not_after" timestamptz null default null, constraint "sessions_pkey" primary key ("id"));');
    this.addSql('comment on table "auth"."sessions" is \'Auth: Stores session data associated to a user.\';');
    this.addSql('comment on column "auth"."sessions"."not_after" is \'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.\';');
    this.addSql('create index "sessions_user_id_idx" on "auth"."sessions" ("user_id");');
    this.addSql('create index "user_id_created_at_idx" on "auth"."sessions" ("user_id", "created_at");');

    this.addSql('create table "auth"."sso_domains" ("id" uuid not null default null, "sso_provider_id" uuid not null default null, "domain" text not null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, constraint "sso_domains_pkey" primary key ("id"), constraint domain not empty check (char_length(domain) > 0));');
    this.addSql('comment on table "auth"."sso_domains" is \'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.\';');
    this.addSql('alter table "auth"."sso_domains" add constraint "sso_domains_domain_idx" unique ("lower(domain)");');
    this.addSql('create index "sso_domains_sso_provider_id_idx" on "auth"."sso_domains" ("sso_provider_id");');

    this.addSql('create table "auth"."sso_providers" ("id" uuid not null default null, "resource_id" text null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, constraint "sso_providers_pkey" primary key ("id"), constraint resource_id not empty check ((resource_id = NULL::text) OR (char_length(resource_id) > 0)));');
    this.addSql('comment on table "auth"."sso_providers" is \'Auth: Manages SSO identity provider information; see saml_providers for SAML.\';');
    this.addSql('comment on column "auth"."sso_providers"."resource_id" is \'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.\';');
    this.addSql('alter table "auth"."sso_providers" add constraint "sso_providers_resource_id_idx" unique ("lower(resource_id)");');

    this.addSql('create table "auth"."users" ("instance_id" uuid null default null, "id" uuid not null default null, "aud" varchar null default null, "role" varchar null default null, "email" varchar null default null, "encrypted_password" varchar null default null, "email_confirmed_at" timestamptz null default null, "invited_at" timestamptz null default null, "confirmation_token" varchar null default null, "confirmation_sent_at" timestamptz null default null, "recovery_token" varchar null default null, "recovery_sent_at" timestamptz null default null, "email_change_token_new" varchar null default null, "email_change" varchar null default null, "email_change_sent_at" timestamptz null default null, "last_sign_in_at" timestamptz null default null, "raw_app_meta_data" jsonb null default null, "raw_user_meta_data" jsonb null default null, "is_super_admin" bool null default null, "created_at" timestamptz null default null, "updated_at" timestamptz null default null, "phone" text null default null, "phone_confirmed_at" timestamptz null default null, "phone_change" text null default \'\', "phone_change_token" varchar null default \'\', "phone_change_sent_at" timestamptz null default null, "confirmed_at" timestamptz null default null, "email_change_token_current" varchar null default \'\', "email_change_confirm_status" int2 null default 0, "banned_until" timestamptz null default null, "reauthentication_token" varchar null default \'\', "reauthentication_sent_at" timestamptz null default null, "is_sso_user" bool not null default false, "deleted_at" timestamptz null default null, constraint "users_pkey" primary key ("id"), constraint users_email_change_confirm_status_check check ((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)));');
    this.addSql('comment on table "auth"."users" is \'Auth: Stores user login data within a secure schema.\';');
    this.addSql('comment on column "auth"."users"."is_sso_user" is \'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.\';');
    this.addSql('alter table "auth"."users" add constraint "confirmation_token_idx" unique ("confirmation_token");');
    this.addSql('alter table "auth"."users" add constraint "email_change_token_current_idx" unique ("email_change_token_current");');
    this.addSql('alter table "auth"."users" add constraint "email_change_token_new_idx" unique ("email_change_token_new");');
    this.addSql('alter table "auth"."users" add constraint "reauthentication_token_idx" unique ("reauthentication_token");');
    this.addSql('alter table "auth"."users" add constraint "recovery_token_idx" unique ("recovery_token");');
    this.addSql('alter table "auth"."users" add constraint "users_email_partial_key" unique ("email");');
    this.addSql('create index "users_instance_id_email_idx" on "auth"."users" ("instance_id", "lower(email::text)");');
    this.addSql('create index "users_instance_id_idx" on "auth"."users" ("instance_id");');
    this.addSql('alter table "auth"."users" add constraint "users_phone_key" unique ("phone");');

    this.addSql('alter table "storage"."buckets" add constraint "buckets_owner_fkey" foreign key ("owner") references "auth"."users" ("id") on update no action on delete no action;');

    this.addSql('alter table "auth"."identities" add constraint "identities_user_id_fkey" foreign key ("user_id") references "auth"."users" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."mfa_amr_claims" add constraint "mfa_amr_claims_session_id_fkey" foreign key ("session_id") references "auth"."sessions" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."mfa_challenges" add constraint "mfa_challenges_auth_factor_id_fkey" foreign key ("factor_id") references "auth"."mfa_factors" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."mfa_factors" add constraint "mfa_factors_user_id_fkey" foreign key ("user_id") references "auth"."users" ("id") on update no action on delete cascade;');

    this.addSql('alter table "storage"."objects" add constraint "objects_bucketId_fkey" foreign key ("bucket_id") references "storage"."buckets" ("id") on update no action on delete no action;');
    this.addSql('alter table "storage"."objects" add constraint "objects_owner_fkey" foreign key ("owner") references "auth"."users" ("id") on update no action on delete no action;');

    this.addSql('alter table "auth"."refresh_tokens" add constraint "refresh_tokens_session_id_fkey" foreign key ("session_id") references "auth"."sessions" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."saml_providers" add constraint "saml_providers_sso_provider_id_fkey" foreign key ("sso_provider_id") references "auth"."sso_providers" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."saml_relay_states" add constraint "saml_relay_states_sso_provider_id_fkey" foreign key ("sso_provider_id") references "auth"."sso_providers" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."sessions" add constraint "sessions_user_id_fkey" foreign key ("user_id") references "auth"."users" ("id") on update no action on delete cascade;');

    this.addSql('alter table "auth"."sso_domains" add constraint "sso_domains_sso_provider_id_fkey" foreign key ("sso_provider_id") references "auth"."sso_providers" ("id") on update no action on delete cascade;');

    this.addSql('drop table if exists "admission_test" cascade;');

    this.addSql('drop table if exists "college" cascade;');

    this.addSql('drop table if exists "department" cascade;');

    this.addSql('drop table if exists "course" cascade;');

    this.addSql('drop table if exists "elective_package" cascade;');

    this.addSql('drop table if exists "instructor" cascade;');

    this.addSql('drop table if exists "map_course_elective_package" cascade;');

    this.addSql('drop table if exists "program" cascade;');

    this.addSql('drop table if exists "map_elective_package_program" cascade;');

    this.addSql('drop table if exists "map_course_program" cascade;');

    this.addSql('drop table if exists "section" cascade;');

    this.addSql('drop table if exists "section_time_slot" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "study_plan" cascade;');

    this.addSql('drop table if exists "map_elective_package_study_plan" cascade;');

    this.addSql('drop table if exists "map_course_study_plan" cascade;');

    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('drop table if exists "admission_test_result" cascade;');
  }

}
