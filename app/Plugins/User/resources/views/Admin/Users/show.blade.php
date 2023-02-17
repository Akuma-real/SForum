@extends("app")

@section('title',"用户信息")


@section('content')
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">【{{$user->username}}】信息</h3>
                <div class="card-actions">
                    <a href="/admin/users/{{$user->id}}/edit" class="btn">修改</a>
                </div>
            </div>
            <div class="card-body">
                @foreach((new \App\Plugins\User\src\Service\UserManagement())->get_all() as $item)
                    @include($item['show_view'])
                @endforeach
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{ mix("plugins/User/js/user.js") }}"></script>
@endsection